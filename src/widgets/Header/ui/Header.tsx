import { Text, View } from "react-native";
import { styles } from "./Header.style";
import { ContentContainer } from "@shared/ui/ContentContainer";
import { useColors } from "@shared/hooks/use-colors";

export const Header = ({}) => {
  const colors = useColors();
  return (
    <View
      style={[
        styles.headerRow,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <ContentContainer>
        <View>
          <Text style={[styles.logoText, { color: colors.textDark }]}>
            попути
          </Text>
          <Text style={[styles.subtitle, { color: colors.textGray }]}>
            Всё рядом с тобой
          </Text>
        </View>
      </ContentContainer>

      {/* <TouchableOpacity
        style={[styles.iconButton, { backgroundColor: colors.white }]}
      >
        <Ionicons
          name="notifications-outline"
          size={24}
          color={colors.textDark}
        />
      </TouchableOpacity> */}
    </View>
  );
};
