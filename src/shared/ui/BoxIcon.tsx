import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps, FC } from "react";
import { StyleSheet, View } from "react-native";
import { useColors } from "../hooks/use-colors";

type MaterialCommunityIconName = ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

interface Props {
  iconName: MaterialCommunityIconName;
  backgroundColor?: string;
  iconColor?: string;
  iconSize?: number;
}

export const BoxIcon: FC<Props> = ({
  iconName,
  iconColor,
  backgroundColor,
  iconSize = 22,
}) => {
  const colors = useColors();
  const bgColor = backgroundColor ?? colors.lightPurple;
  const iconFillColor = iconColor ?? colors.primary;
  return (
    <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
      <MaterialCommunityIcons
        name={iconName}
        size={iconSize}
        color={iconFillColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
});
