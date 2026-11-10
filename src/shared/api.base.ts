import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import { authStore } from "@features/auth/stores/Auth.store";

// ⚠️ Импорт authApi может создать циклическую зависимость, поэтому
// используем «ленивую» подгрузку внутри интерсептора (см. ниже).
// Либо вынесите AuthApi в отдельный файл, который не импортирует `api`.

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true,
});

// ⬇️ Состояние очереди
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else if (token) prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = authStore.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 1. Если это не 401 или запрос уже повторялся — отдаём ошибку
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // 2. Не пытаемся обновлять токен на самом эндпоинте refresh
    // (иначе бесконечный цикл)
    if (originalRequest.url?.includes("account/refresh")) {
      return Promise.reject(error);
    }

    // 3. Если refresh уже идёт — ставим запрос в очередь
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    // 4. Запускаем refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // ⚠️ Ленивый импорт, чтобы избежать циклической зависимости
      const { AuthApi } = await import("@features/auth/api/Auth.api");
      const authApi = new AuthApi(api);

      const newAccessToken = await authApi.refresh();

      // Сохраняем токен в MobX + SecureStore
      await authStore.setAccessToken(newAccessToken);

      // Прогоняем очередь
      processQueue(null, newAccessToken);

      // Повторяем исходный запрос
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      // Refresh не удался — сессия мертва
      processQueue(refreshError, null);
      await authStore.clearAccessToken();

      // Здесь можно сделать редирект на /login через router
      // router.replace("/login"); — но роутер недоступен в модуле,
      // поэтому лучше подписаться в компоненте/эффекте на authStore.isAuthenticated

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
