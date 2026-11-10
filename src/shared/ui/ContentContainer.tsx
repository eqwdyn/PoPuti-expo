import type { FC, PropsWithChildren } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { useColors } from "../hooks/use-colors";

export const ContentContainer: FC<PropsWithChildren & ViewProps> = ({
  children,
  style,
  ...props
}) => {
  const colors = useColors();
  return (
    <View
      style={[styles.content, { backgroundColor: colors.background }, style]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    flex: 1,
  },
});
