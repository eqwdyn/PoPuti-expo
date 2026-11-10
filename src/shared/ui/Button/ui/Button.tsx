import type { FC, PropsWithChildren } from "react";
import { styles } from "./Button.style";
import { Text, TouchableOpacity } from "react-native";
import { useColors } from "@shared/hooks/use-colors";

interface Props extends PropsWithChildren {
  onPress: () => void;
  disabled?: boolean;
}

export const Button: FC<Props> = ({ onPress, children, disabled }) => {
  const colors = useColors();
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primary }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};
