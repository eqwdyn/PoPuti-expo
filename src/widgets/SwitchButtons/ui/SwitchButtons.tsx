import { styles } from "./SwitchButtons.style";
import { useColors } from "../../../shared/hooks/use-colors";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  items: string[];
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export function SwitchButtons({ items, activeItem, setActiveItem }: Props) {
  const colors = useColors();
  return (
    <View style={[styles.toggleContainer, { backgroundColor: colors.white }]}>
      {items.map((item) => (
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            activeItem === item && { backgroundColor: colors.primary },
          ]}
          onPress={() => setActiveItem(item)}
          key={item}
        >
          <Text
            style={[
              styles.toggleText,
              {
                color: activeItem === item ? colors.white : colors.textDark,
              },
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
