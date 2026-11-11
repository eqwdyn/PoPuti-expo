import type { FC } from "react";
import { styles } from "./AccountHeader.style";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@shared/hooks/use-colors";

interface Props {
  name: string;
  surname: string;
  joinedIn: string;
}

export const AccountHeader: FC<Props> = ({ name, surname, joinedIn }) => {
  const colors = useColors();
  return (
    <View style={styles.headerRow}>
      <View>
        <Text style={[styles.userName, { color: colors.textDark }]}>
          {name} {surname}
        </Text>
        <Text style={[styles.userSince, { color: colors.textGray }]}>
          С вами с {joinedIn}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.settingsButton, { backgroundColor: colors.white }]}
      >
        <Ionicons name="settings-outline" size={24} color={colors.textDark} />
      </TouchableOpacity>
    </View>
  );
};
