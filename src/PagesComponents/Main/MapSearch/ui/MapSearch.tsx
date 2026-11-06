import type { FC } from "react";
import { styles } from "./MapSearch.style";
import { TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@shared/hooks/use-colors";

interface Props {}

export const MapSearch: FC<Props> = ({}) => {
  const colors = useColors();
  return (
    <View style={[styles.searchContainer, { backgroundColor: colors.white }]}>
      <Ionicons
        name="search"
        size={20}
        color={colors.textDark}
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Найти место"
        placeholderTextColor={colors.textGray}
        style={[styles.searchInput, { color: colors.textDark }]}
      />
    </View>
  );
};
