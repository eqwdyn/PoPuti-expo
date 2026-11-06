import type { FC } from "react";
import { styles } from "./ModeToggle.style";
import { Text, TouchableOpacity, View } from "react-native";
import { useColors } from "@shared/hooks/use-colors";

interface Props {
  activeTab: "courier" | "customer";
  setActiveTab: (str: "courier" | "customer") => void;
}

export const ModeToggle: FC<Props> = ({ activeTab, setActiveTab }) => {
  const colors = useColors();
  return (
    <View style={[styles.toggleContainer, { backgroundColor: colors.white }]}>
      <TouchableOpacity
        style={[
          styles.toggleBtn,
          activeTab === "customer" && { backgroundColor: colors.primary },
        ]}
        onPress={() => setActiveTab("customer")}
      >
        <Text
          style={[
            styles.toggleText,
            {
              color: activeTab === "customer" ? colors.white : colors.textDark,
            },
          ]}
        >
          Я заказчик
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.toggleBtn,
          activeTab === "courier" && { backgroundColor: colors.primary },
        ]}
        onPress={() => setActiveTab("courier")}
      >
        <Text
          style={[
            styles.toggleText,
            {
              color: activeTab === "courier" ? colors.white : colors.textDark,
            },
          ]}
        >
          Я курьер
        </Text>
      </TouchableOpacity>
    </View>
  );
};
