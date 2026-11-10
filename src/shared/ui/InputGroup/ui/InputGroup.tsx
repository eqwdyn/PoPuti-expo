import type { FC, PropsWithChildren } from "react";
import { styles } from "./InputGroup.style";
import { Text, TextInput, View } from "react-native";
import { useColors } from "@shared/hooks/use-colors";

interface Props extends PropsWithChildren {
  value: string;
  setValue: (text: string) => void;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
}

export const InputGroup: FC<Props> = ({
  value,
  setValue,
  label,
  placeholder,
  children,
  secureTextEntry = false,
  error,
}) => {
  const colors = useColors();
  const hasError = Boolean(error);

  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: colors.textDark }]}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: hasError ? colors.tintRed : colors.background,
            borderColor: hasError ? colors.red : "transparent",
            borderWidth: hasError ? 1 : 0,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.textDark }]}
          placeholder={placeholder}
          placeholderTextColor={hasError ? colors.red : colors.textGray}
          value={value}
          onChangeText={setValue}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
        />
        {children}
      </View>

      {hasError && (
        <Text style={[styles.errorText, { color: colors.red }]}>{error}</Text>
      )}
    </View>
  );
};
