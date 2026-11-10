import { FC, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@shared/hooks/use-colors";
import { InputGroup } from "@shared/ui/InputGroup";
import { Button } from "@shared/ui/Button";
import { TopicError } from "@shared/ui/TopicError";
import { useRegister } from "../../../hooks/useRegister";
import { useAuthForm } from "../../../hooks/useAuthForm";
import { styles } from "./RegisterForm.style";

export const RegisterForm: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { mutateAsync: fetchRegister, isPending } = useRegister();
  const colors = useColors();

  const {
    values,
    setFieldValue,
    fieldErrors,
    topicError,
    handleSubmit,
    handleApiError,
  } = useAuthForm({
    initialValues: {
      login: "",
      password: "",
      name: "",
      surname: "",
      phone: "",
    },
    validate: (vals) => {
      const errors: Record<string, string> = {};
      if (vals.login.length < 4)
        errors.login = "Логин должен содержать минимум 4 символа";
      if (vals.password.length < 4)
        errors.password = "Пароль должен содержать минимум 4 символа";
      if (!vals.name.trim()) errors.name = "Введите имя";
      if (!vals.surname.trim()) errors.surname = "Введите фамилию";
      if (vals.phone.length < 10)
        errors.phone = "Введите корректный номер телефона";
      return errors;
    },
    onSubmit: (vals, setTopicErr, setFieldErrs) => {
      fetchRegister(vals, {
        onError: (err) => {
          handleApiError(err, {
            // Бэкенд возвращает 409, если логин или телефон заняты
            409: () => {
              const msg = err.response?.data?.message || "";
              // Простая эвристика: если в тексте ошибки есть "phone" - вешаем на телефон
              if (msg.toLowerCase().includes("phone")) {
                setFieldErrs({
                  phone: "Этот номер телефона уже используется.",
                });
              } else {
                setFieldErrs({ login: "Логин уже занят. Выберите другой." });
              }
            },
          });
        },
      });
    },
  });

  const buttonText = isPending
    ? "Создание..."
    : topicError
      ? "Повторить"
      : "Создать аккаунт";

  return (
    <View>
      {topicError && (
        <TopicError title={topicError.title} description={topicError.desc} />
      )}

      <View style={[styles.formContainer, { backgroundColor: colors.white }]}>
        <InputGroup
          value={values.login}
          setValue={(t) => setFieldValue("login", t)}
          placeholder="Введите логин"
          label="Логин"
          error={fieldErrors.login}
        />

        <InputGroup
          label="Пароль"
          value={values.password}
          setValue={(t) => setFieldValue("password", t)}
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

        <InputGroup
          value={values.name}
          setValue={(t) => setFieldValue("name", t)}
          placeholder="Алексей"
          label="Имя"
          error={fieldErrors.name}
        />

        <InputGroup
          value={values.surname}
          setValue={(t) => setFieldValue("surname", t)}
          placeholder="Иванов"
          label="Фамилия"
          error={fieldErrors.surname}
        />

        <InputGroup
          value={values.phone}
          setValue={(t) => setFieldValue("phone", t)}
          placeholder="+7 (999) 123-45-67"
          label="Телефон"
          error={fieldErrors.phone}
        />

        <Button onPress={handleSubmit} disabled={isPending}>
          {buttonText}
        </Button>
      </View>
    </View>
  );
};
