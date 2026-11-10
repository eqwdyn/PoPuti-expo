import type { FC } from "react";
import { styles } from "./TopicError.style";
import { useColors } from "@shared/hooks/use-colors";
import { Text, View } from "react-native";

interface Props {
  title: string;
  description: string;
}

export const TopicError: FC<Props> = ({ title, description }) => {
  const colors = useColors();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.tintRed, borderColor: colors.red },
      ]}
    >
      <Text style={[styles.title, { color: colors.red }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.red }]}>
        {description}
      </Text>
    </View>
  );
};
