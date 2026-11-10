import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Header.style";
import { ContentContainer } from "@shared/ui/ContentContainer";
import { useColors } from "@shared/hooks/use-colors";
import { authStore } from "@features/auth/stores/Auth.store";
import { Ionicons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";

export const Header = observer(({}) => {
  const colors = useColors();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        borderBottomColor: colors.border,
      }}
    >
      <ContentContainer style={styles.headerRow}>
        <View>
          <Text style={[styles.logoText, { color: colors.textDark }]}>
            попути
          </Text>
          <Text style={[styles.subtitle, { color: colors.textGray }]}>
            Всё рядом с тобой
          </Text>
        </View>

        {authStore.isAuthenticated && (
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.white }]}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.textDark}
            />
          </TouchableOpacity>
        )}
      </ContentContainer>
    </View>
  );
});
