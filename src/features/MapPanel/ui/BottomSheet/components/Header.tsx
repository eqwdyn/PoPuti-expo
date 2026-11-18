import type { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColors } from "@shared/hooks/use-colors";

interface Props {
  title: string;
  subtitle: string;
}

export const Header: FC<Props> = ({ title, subtitle }) => {
  const colors = useColors();
  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: colors.textDark }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: colors.textGray }]}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
});
