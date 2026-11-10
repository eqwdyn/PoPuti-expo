// LoginForm.tsx
import { FC, useState } from "react";
import { styles } from "./LoginForm.style";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@shared/hooks/use-colors";
import { InputGroup } from "@shared/ui/InputGroup";
import { Button } from "@shared/ui/Button";
import { useLogin } from "../../../hooks/useLogin";
import { TopicError } from "@shared/ui/TopicError";
import { useAuthForm } from "../../../hooks/useAuthForm";

export const LoginForm: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { mutateAsync: fetchLogin, isPending } = useLogin();
  const colors = useColors();

  const {
    values,
    setFieldValue,
    fieldErrors,
    topicError,
    handleSubmit,
    handleApiError,
  } = useAuthForm({
    initialValues: { login: "", password: "" },
    validate: (vals) => {
      const errors: Record<string, string> = {};
      if (vals.login.length < 4)
        errors.login = "Логин должен содержать минимум 4 символа";
      if (vals.password.length < 4)
        errors.password = "Пароль должен содержать минимум 4 символа";
      return errors;
    },
    onSubmit: (vals, setTopicErr, setFieldErrs) => {
      fetchLogin(vals, {
        onError: (err) => {
          handleApiError(err, {
            401: () => {
              setFieldErrs({
                login: "Неверный логин или пароль",
                password: "Неверный логин или пароль",
              });
            },
          });
        },
      });
    },
  });

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
          value={values.login}
          setValue={(text) => setFieldValue("login", text)}
          placeholder="Введите логин"
          label="Логин"
          error={fieldErrors.login}
        />

        <InputGroup
          label="Пароль"
          value={values.password}
          setValue={(text) => setFieldValue("password", text)}
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

        <Button onPress={handleSubmit} disabled={isPending}>
          {buttonText}
        </Button>
      </View>
    </View>
  );
};
