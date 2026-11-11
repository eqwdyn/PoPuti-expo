import type { FC } from "react";
import { styles } from "./BalanceCard.style";
import { Text, TouchableOpacity, View } from "react-native";
import { useColors } from "@shared/hooks/use-colors";

interface Props {
  balance: string;
}

export const BalanceCard: FC<Props> = ({ balance }) => {
  const colors = useColors();
  return (
    <View style={[styles.balanceCard, { backgroundColor: colors.primary }]}>
      <Text style={styles.balanceLabel}>Доступно к выводу</Text>
      <View style={styles.balanceRow}>
        <Text style={styles.balanceAmount}>{balance} ₽</Text>
        <TouchableOpacity style={styles.withdrawButton}>
          <Text style={[styles.withdrawText, { color: colors.primary }]}>
            Вывести
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.balanceNote}>
        Деньги защищены до завершения заказа
      </Text>
    </View>
  );
};
