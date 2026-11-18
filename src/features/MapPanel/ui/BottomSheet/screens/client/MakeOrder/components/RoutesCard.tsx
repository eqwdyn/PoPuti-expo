import { StyleSheet, Text, View } from "react-native";
import { useColors } from "@shared/hooks/use-colors";
import { FC } from "react";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

interface Props {
  from: string;
  setFrom: (text: string) => void;
  to: string;
  setTo: (text: string) => void;
}

export const RoutesCard: FC<Props> = ({ from, to, setFrom, setTo }) => {
  const colors = useColors();
  return (
    <View style={[styles.routeCard, { backgroundColor: colors.background }]}>
      <View style={styles.routeRow}>
        <View style={[styles.circle, { backgroundColor: colors.lightPurple }]}>
          <Text style={{ color: colors.primary, fontWeight: "600" }}>1</Text>
        </View>
        <View style={styles.routeTextContainer}>
          <Text style={[styles.routeLabel, { color: colors.textGray }]}>
            Откуда забрать
          </Text>
          <BottomSheetTextInput
            style={[styles.routeInput, { color: colors.textDark }]}
            value={from}
            onChangeText={setFrom}
            placeholder="Введите адрес"
            placeholderTextColor={colors.textGray}
          />
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <View style={styles.routeRow}>
        <View style={[styles.circle, { backgroundColor: colors.white }]}>
          <Text style={{ color: colors.primary, fontWeight: "600" }}>2</Text>
        </View>
        <View style={styles.routeTextContainer}>
          <Text style={[styles.routeLabel, { color: colors.textGray }]}>
            Куда доставить
          </Text>
          <BottomSheetTextInput
            style={[styles.routeInput, { color: colors.textDark }]}
            value={to}
            onChangeText={setTo}
            placeholder="Введите адрес"
            placeholderTextColor={colors.textGray}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  routeCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  routeTextContainer: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  routeInput: {
    fontSize: 15,
    fontWeight: "600",
    padding: 0, // Убираем внутренние отступы, чтобы текст выглядел как обычный
    margin: 0, // Убираем внешние отступы
    height: 20, // Явная высота для строки (опционально, можно подстроить под шрифт)
  },
  divider: {
    height: 1,
    marginVertical: 12,
    marginLeft: 36, // Выравнивание под текст
  },
});
