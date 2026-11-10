import { observer } from "mobx-react-lite";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useColors } from "@shared/hooks/use-colors";
import { ScrollLayout } from "@shared/ui/ScrollLayout";
import { useMe } from "@features/auth/hooks/useMe";
import { SafeBg } from "@shared/ui/SafeBg";
import { AccountVerificationLevel } from "../../widgets/AccountVerificationLevel";
import { CourierLevel } from "../../widgets/CourierLevel";
import { AccountStat } from "../../widgets/AccountStats";
import { BoxIcon } from "../../shared/ui/BoxIcon";

export default observer(function ProfileScreen() {
  const colors = useColors();
  const { data: user, isLoading, isError } = useMe();

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError || !user) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textDark }}>
          Не удалось загрузить профиль
        </Text>
      </View>
    );
  }

  return (
    <SafeBg>
      <ScrollLayout>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.userName, { color: colors.textDark }]}>
              {user.name} {user.surname}
            </Text>
            <Text style={[styles.userSince, { color: colors.textGray }]}>
              С вами с октября 2026
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.settingsButton, { backgroundColor: colors.white }]}
          >
            <Ionicons
              name="settings-outline"
              size={24}
              color={colors.textDark}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.balanceCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.balanceLabel}>Доступно к выводу</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceAmount}>2 480 ₽</Text>
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

        <AccountVerificationLevel level="pro" />

        {/* Блок со статистикой (Курьер / Заказчик) */}
        <View style={styles.statsRow}>
          <AccountStat
            header="Я курьер"
            points="4,9"
            description="12 доставок"
          />
          <AccountStat
            header="Я заказчик"
            points="5,0"
            description="7 заказов"
          />
        </View>

        <CourierLevel level="starter" />

        {/* История заказов */}
        <View style={styles.historyHeader}>
          <Text style={[styles.historyTitle, { color: colors.textDark }]}>
            История заказов
          </Text>
          <TouchableOpacity>
            <Text style={[styles.historyLink, { color: colors.primary }]}>
              Все
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.orderCard, { backgroundColor: colors.white }]}>
          <BoxIcon iconName="cube-outline" />
          <View style={styles.orderInfo}>
            <Text style={[styles.orderTitle, { color: colors.textDark }]}>
              Доставка из кафе
            </Text>
            <Text style={[styles.orderDesc, { color: colors.textGray }]}>
              Сегодня, 12:40 · выполнен
            </Text>
          </View>
          <View style={styles.orderRight}>
            <Text style={[styles.orderAmount, { color: colors.textDark }]}>
              +240 ₽
            </Text>
            <Text style={[styles.orderNumber, { color: colors.textGray }]}>
              № 1041
            </Text>
          </View>
        </View>
      </ScrollLayout>
    </SafeBg>
  );
});

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
  },
  userSince: {
    fontSize: 14,
    marginTop: 4,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  balanceCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  withdrawButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  withdrawText: {
    fontSize: 14,
    fontWeight: "600",
  },
  balanceNote: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  historyLink: {
    fontSize: 14,
    fontWeight: "500",
  },
  orderCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
  },
  orderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  orderTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  orderDesc: {
    fontSize: 12,
  },
  orderRight: {
    alignItems: "flex-end",
  },
  orderAmount: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  orderNumber: {
    fontSize: 12,
  },
});
