import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Marker, Point } from "expo-yandex-mapkit";
import type { ComponentProps, FC } from "react";
import { StyleSheet, View } from "react-native";
import { useColors } from "@shared/hooks/use-colors";

type MaterialCommunityIconName = ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

interface Props {
  point: Point;
  iconName: MaterialCommunityIconName;
}

export const CustomMarker: FC<Props> = ({ point, iconName }) => {
  const colors = useColors();
  return (
    <Marker point={point}>
      <View
        style={[styles.pinContainer, { backgroundColor: colors.lightPurple }]}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={36}
          color={colors.primary}
        />
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  pinContainer: { alignItems: "center", padding: 5, borderRadius: "50%" },
});
