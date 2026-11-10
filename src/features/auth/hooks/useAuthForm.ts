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

  // Универсальный сеттер для полей с авто-очисткой ошибки
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
    error: AxiosError<{ message: string }>,
    customHandlers?: Record<number, () => void>,
  ) => {
    if (!error.response) {
      setTopicError({
        title: "Нет соединения",
        desc: "Проверьте подключение к интернету и попробуйте еще раз.",
      });
      return;
    }

    const status = error.response.status;

    if (customHandlers && customHandlers[status]) {
      customHandlers[status]();
      return;
    }

    if (status === 500 || status === 502 || status === 503) {
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
