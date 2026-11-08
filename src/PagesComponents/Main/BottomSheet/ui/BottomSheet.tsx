import { useState, type FC } from "react";
import { styles } from "./BottomSheet.style";
import { BottomSheetProxy } from "@shared/ui/BottomSheetProxy";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useColors } from "@shared/hooks/use-colors";

interface Props {}

export const BottomSheet: FC<Props> = ({}) => {
  const colors = useColors();
  const [activeCategory, setActiveCategory] = useState("Кафе");

  return (
    <BottomSheetProxy>
      <Text style={[styles.sheetTitle, { color: colors.textDark }]}>
        Что доставить?
      </Text>
      <Text style={[styles.sheetSubtitle, { color: colors.textGray }]}>
        Места рядом · Чистые пруды
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContainer}
      >
        {["Кафе", "Магазины", "Все места"].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              {
                backgroundColor:
                  activeCategory === cat ? colors.darkButton : colors.cardBg,
              },
            ]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                {
                  color:
                    activeCategory === cat ? colors.white : colors.textDark,
                },
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={[styles.placeCard, { backgroundColor: colors.background }]}>
        <View
          style={[
            styles.placeIconContainer,
            { backgroundColor: colors.lightPurple },
          ]}
        >
          <MaterialCommunityIcons
            name="coffee"
            size={24}
            color={colors.primary}
          />
        </View>
        <View style={styles.placeInfo}>
          <Text style={[styles.placeName, { color: colors.textDark }]}>
            Кофе на углу
          </Text>
          <Text style={[styles.placeDetails, { color: colors.textGray }]}>
            ★ 4,9 · 15–25 мин · 600 м
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: colors.primary }]}
      >
        <Text style={[styles.primaryButtonText, { color: colors.white }]}>
          Открыть меню
        </Text>
        <Ionicons name="arrow-forward" size={20} color={colors.white} />
      </TouchableOpacity>
    </BottomSheetProxy>
  );
};
