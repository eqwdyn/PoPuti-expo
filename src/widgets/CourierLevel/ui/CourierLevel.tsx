import type { FC } from "react";
import { styles } from "./CourierLevel.style";
import { Text, View } from "react-native";
import { useColors } from "@shared/hooks/use-colors";

interface Props {
  level: "starter" | "intermediate" | "pro";
}

export const CourierLevel: FC<Props> = ({ level }) => {
  const colors = useColors();

  // Контент для каждого уровня
  const content = {
    starter: {
      badge: "Новичок",
      title: "Заказы до 1 000 ₽",
      desc1: "Средний рейтинг → до 3 000 ₽",
      desc2: "Высокий рейтинг → крупные заказы",
    },
    intermediate: {
      badge: "Проверенный",
      title: "Заказы до 3 000 ₽",
      desc1: "Высокий рейтинг → крупные заказы",
      desc2: "Доступны срочные доставки",
    },
    pro: {
      badge: "Профи",
      title: "Крупные заказы",
      desc1: "Приоритет в выдаче заказов",
      desc2: "Доступны все типы доставок",
    },
  };

  const current = content[level];

  return (
    <View style={[styles.levelCard, { backgroundColor: colors.darkButton }]}>
      <View style={styles.levelHeader}>
        <Text style={styles.levelLabel}>Ваш уровень</Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeText}>{current.badge}</Text>
        </View>
      </View>
      <Text style={styles.levelTitle}>{current.title}</Text>
      <Text style={styles.levelDesc}>{current.desc1}</Text>
      <Text style={styles.levelDesc}>{current.desc2}</Text>
    </View>
  );
};
