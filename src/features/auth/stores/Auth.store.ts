import { makeAutoObservable, runInAction } from "mobx";
import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "access_token";

class AuthStore {
  accessToken: string | null = null;
  isLoading = true;
  isInitialized = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /**
   * Вызывается один раз при старте приложения.
   * Загружает токен из SecureStore в память.
   */
  async initialize() {
    try {
      const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      runInAction(() => {
        this.accessToken = token;
        this.isInitialized = true;
        this.isLoading = false;
      });
    } catch (e) {
      console.warn("Failed to load token", e);
      runInAction(() => {
        this.isInitialized = true;
        this.isLoading = false;
      });
    }
  }

  /**
   * Сохраняет токен в память и в SecureStore.
   * Вызывается из onSuccess мутации login/register.
   */
  async setAccessToken(token: string) {
    runInAction(() => {
      this.accessToken = token;
    });
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  }

  /**
   * Удаляет токен из памяти и из SecureStore.
   * Вызывается при logout или при ошибке refresh.
   */
  async clearAccessToken() {
    runInAction(() => {
      this.accessToken = null;
    });
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  }

  get isAuthenticated() {
    return !!this.accessToken;
  }
}

export const authStore = new AuthStore();
