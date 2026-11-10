import { useState } from "react";
import { AxiosError } from "axios";

interface FormFields {
  [key: string]: string;
}

interface UseAuthFormProps<T extends FormFields> {
  initialValues: T;
  validate: (values: T) => Record<string, string | undefined>;
  onSubmit: (
    values: T,
    setTopicError: (err?: { title: string; desc: string }) => void,
    setFieldErrors: (errs: Record<string, string | undefined>) => void,
  ) => void;
}

export function useAuthForm<T extends FormFields>({
  initialValues,
  validate,
  onSubmit,
}: UseAuthFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [topicError, setTopicError] = useState<
    { title: string; desc: string } | undefined
  >(undefined);

  const setFieldValue = (field: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field as string]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    setFieldErrors({});
    setTopicError(undefined);

    const errors = validate(values);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    onSubmit(values, setTopicError, setFieldErrors);
  };

  const handleApiError = (
    error: AxiosError<{ message: string; errors: Record<string, string[]> }>,
    customHandlers?: Record<number, () => void>,
  ) => {
    // 1. Нет соединения
    if (!error.response) {
      setTopicError({
        title: "Нет соединения",
        desc: "Проверьте подключение к интернету и попробуйте еще раз.",
      });
      return;
    }

    const status = error.response.status;

    // 2. Кастомные обработчики для конкретных статусов (401, 409 и т.д.)
    if (customHandlers && customHandlers[status]) {
      customHandlers[status]();
      return;
    }

    // 3. Ошибки валидации DTO (400) — раскладываем по полям
    const serverErrors = error.response.data?.errors;
    if (status === 400 && serverErrors) {
      const parsed: Record<string, string | undefined> = {};
      for (const [field, messages] of Object.entries(serverErrors)) {
        // Берём первое сообщение для каждого поля
        parsed[field] = Array.isArray(messages)
          ? messages[0]
          : String(messages);
      }
      setFieldErrors(parsed);
      return;
    }

    // 4. Остальные ошибки — в общий баннер
    if (status >= 500) {
      setTopicError({ title: "Ошибка на сервере", desc: "Попробуйте позже." });
    } else {
      setTopicError({
        title: "Что-то пошло не так",
        desc: error.response.data?.message || "Попробуйте еще раз.",
      });
    }
  };

  return {
    values,
    setFieldValue,
    fieldErrors,
    setFieldErrors,
    topicError,
    setTopicError,
    handleSubmit,
    handleApiError,
  };
}
