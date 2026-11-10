import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { authStore } from "@features/auth/stores/Auth.store";
import { AuthApi } from "../api/Auth.api";
import { api } from "@shared/api.base";
import { LoginDto } from "../api/dto/login.dto";

export function useLogin() {
  const queryClient = useQueryClient();
  const authApi = new AuthApi(api);

  return useMutation<
    string,
    AxiosError<{ message: string; errors: Record<string, string[]> }>,
    LoginDto
  >({
    mutationFn: (dto) => authApi.login(dto),
    onSuccess: async (accessToken) => {
      await authStore.setAccessToken(accessToken);
      queryClient.clear();
    },
  });
}
