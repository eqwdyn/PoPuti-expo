import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import type { ComponentProps, FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColors } from "@shared/hooks/use-colors";

type AdditionalProps = ComponentProps<typeof BottomSheetTextInput>;

interface Props extends AdditionalProps {
  label: string;
  value: string;
  setValue: (text: string) => void;
  type?: "input" | "textArea";
  optional?: string;
  hint?: string;
}

export const InputGroup: FC<Props> = ({
  label,
  value,
  setValue,
  optional,
  hint,
  type = "input",
}) => {
  const colors = useColors();
  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: colors.textDark }]}>{label}</Text>
      {optional && (
        <Text style={[styles.optional, { color: colors.textGray }]}>
          {optional}
        </Text>
      )}

      <BottomSheetTextInput
        style={[
          styles.input,
          type === "textArea" ? styles.textArea : undefined,
          { backgroundColor: colors.background, color: colors.textDark },
        ]}
        placeholderTextColor={colors.textGray}
        value={value}
        onChangeText={setValue}
      />

      {hint && (
        <Text style={[styles.hint, { color: colors.textGray }]}>{hint}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  optional: {
    fontSize: 13,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    minHeight: 52,
  },
  textArea: {
    height: 100,
    paddingTop: 14,
  },
  hint: {
    fontSize: 12,
    marginTop: 6,
  },
});
