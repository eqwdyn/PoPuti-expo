// LoginForm.tsx
import { useState, type FC } from "react";
import { styles } from "./LoginForm.style";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@shared/hooks/use-colors";
import { InputGroup } from "@shared/ui/InputGroup";
import { Button } from "@shared/ui/Button";
import { useLogin } from "../../../hooks/useLogin";
import { AxiosError } from "axios";
import { TopicError } from "@shared/ui/TopicError";

export const LoginForm: FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const [fieldErrors, setFieldErrors] = useState<{
    login?: string;
    password?: string;
  }>({});

  const [topicError, setTopicError] = useState<
    { title: string; desc: string } | undefined
  >(undefined);

  const { mutateAsync: fetchLogin, isPending } = useLogin();
  const colors = useColors();

  const validate = () => {
    const newErrors: { login?: string; password?: string } = {};

    if (login.length < 4) {
      newErrors.login = "Логин должен содержать минимум 4 символа";
    }
    if (password.length < 4) {
      newErrors.password = "Пароль должен содержать минимум 4 символа";
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandle = async () => {
    setFieldErrors({});
    setTopicError(undefined);

    if (!validate()) {
      return;
    }

    fetchLogin(
      { login, password },
      {
        onError: (error: AxiosError<{ message: string }>) => {
          if (!error.response) {
            setTopicError({
              title: "Нет соединения",
              desc: "Проверьте подключение к интернету и попробуйте еще раз.",
            });
            return;
          }

          const status = error.response.status;

          if (status === 401) {
            setFieldErrors({
              login: "Неверный логин или пароль",
              password: "Неверный логин или пароль",
            });
          } else if (status === 500 || status === 502 || status === 503) {
            setTopicError({
              title: "Ошибка на сервере",
              desc: "Попробуйте позже.",
            });
          } else {
            setTopicError({
              title: "Что-то пошло не так",
              desc: error.response.data?.message || "Попробуйте еще раз.",
            });
          }
        },
      },
    );
  };

  const buttonText = isPending
    ? "Вход..."
    : topicError
      ? "Повторить вход"
      : "Войти";

  return (
    <View>
      {topicError && (
        <TopicError title={topicError.title} description={topicError.desc} />
      )}

      <View style={[styles.formContainer, { backgroundColor: colors.white }]}>
        <InputGroup
          value={login}
          setValue={(text) => {
            setLogin(text);
            if (fieldErrors.login)
              setFieldErrors((prev) => ({ ...prev, login: undefined }));
          }}
          placeholder="Введите логин"
          label="Логин"
          error={fieldErrors.login}
        />

        <InputGroup
          label="Пароль"
          value={password}
          setValue={(text) => {
            setPassword(text);
            if (fieldErrors.password)
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
          }}
          placeholder="Введите пароль"
          secureTextEntry={!isPasswordVisible}
          error={fieldErrors.password}
        >
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={colors.textGray}
            />
          </TouchableOpacity>
        </InputGroup>

        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
            Забыли пароль?
          </Text>
        </TouchableOpacity>

        <Button onPress={submitHandle} disabled={isPending}>
          {buttonText}
        </Button>
      </View>
    </View>
  );
};
