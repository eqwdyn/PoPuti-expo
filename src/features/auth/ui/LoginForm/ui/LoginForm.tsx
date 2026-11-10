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
  const [fieldError, setFieldError] = useState<string | undefined>(undefined);

  // Состояние для общей ошибки (заголовок + описание)
  const [topicError, setTopicError] = useState<
    { title: string; desc: string } | undefined
  >(undefined);

  const { mutateAsync: fetchLogin, isPending } = useLogin();
  const colors = useColors();

  const submitHandle = async () => {
    setFieldError(undefined);
    setTopicError(undefined);

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
            setFieldError("Неверный логин или пароль");
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

  // Определяем текст на кнопке в зависимости от ошибки/загрузки
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
          setValue={setLogin}
          placeholder="Введите логин"
          label="Логин"
          error={fieldError}
        />

        <InputGroup
          label="Пароль"
          value={password}
          setValue={setPassword}
          placeholder="Введите пароль"
          secureTextEntry={!isPasswordVisible}
          error={fieldError}
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
