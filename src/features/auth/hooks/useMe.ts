import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthApi } from "../api/Auth.api";
import { api } from "@shared/api.base";
import { User } from "@entities/User.ent";
import { authStore } from "@features/auth/stores/Auth.store";

export function useMe() {
  const authApi = new AuthApi(api);

  return useQuery<
    User,
    AxiosError<{ message: string; errors: Record<string, string[]> }>
  >({
    queryKey: ["me"],
    queryFn: () => authApi.me(),
    enabled: authStore.isAuthenticated,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) return false;
      return failureCount < 2;
    },
  });
}
