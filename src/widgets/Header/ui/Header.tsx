import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Header.style";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@shared/constants/theme";
import { useColorScheme } from "@shared/hooks/use-color-scheme.web";

export const Header = ({}) => {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "dark" ? "dark" : "light"];
  return (
    <View style={styles.headerRow}>
      <View>
        <Text style={[styles.logoText, { color: colors.textDark }]}>
          попути
        </Text>
        <Text style={[styles.subtitle, { color: colors.textGray }]}>
          Всё рядом с тобой
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.iconButton, { backgroundColor: colors.white }]}
      >
        <Ionicons
          name="notifications-outline"
          size={24}
          color={colors.textDark}
        />
      </TouchableOpacity>
    </View>
  );
};
