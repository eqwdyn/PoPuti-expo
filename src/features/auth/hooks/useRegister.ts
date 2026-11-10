import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { authStore } from "@features/auth/stores/Auth.store";
import { RegisterDto } from "../api/dto/register.dto";
import { AuthApi } from "../api/Auth.api";
import { api } from "@shared/api.base";

export function useRegister() {
  const queryClient = useQueryClient();
  const authApi = new AuthApi(api);

  return useMutation<string, AxiosError<{ message: string }>, RegisterDto>({
    mutationFn: (dto) => authApi.register(dto),
    onSuccess: async (accessToken) => {
      await authStore.setAccessToken(accessToken);
      queryClient.clear();
    },
  });
}
