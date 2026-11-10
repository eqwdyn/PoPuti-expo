import type { FC } from "react";
import { styles } from "./AccountStat.style";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@shared/hooks/use-colors";

interface Props {
  header: string;
  points: string;
  description: string;
}

export const AccountStat: FC<Props> = ({ header, points, description }) => {
  const colors = useColors();
  return (
    <View style={[styles.statCard, { backgroundColor: colors.white }]}>
      <Text style={[styles.statLabel, { color: colors.textGray }]}>
        {header}
      </Text>
      <View style={styles.statValueRow}>
        <Text style={[styles.statValue, { color: colors.textDark }]}>
          {points}
        </Text>
        <Ionicons name="star" size={16} color={colors.primary} />
      </View>
      <Text style={[styles.statSub, { color: colors.textGray }]}>
        {description}
      </Text>
    </View>
  );
};
