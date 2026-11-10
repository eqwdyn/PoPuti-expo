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
import { SafeBg } from "../../shared/ui/SafeBg";

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

        {/* Карточка баланса */}
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

        {/* Статус аккаунта */}
        <TouchableOpacity
          style={[styles.accountStatusCard, { backgroundColor: colors.white }]}
        >
          <View
            style={[styles.iconBox, { backgroundColor: colors.lightPurple }]}
          >
            <MaterialCommunityIcons
              name="shield-check"
              size={22}
              color={colors.primary}
            />
          </View>
          <View style={styles.accountStatusText}>
            <Text
              style={[styles.accountStatusTitle, { color: colors.textDark }]}
            >
              Аккаунт проверен
            </Text>
            <Text
              style={[styles.accountStatusDesc, { color: colors.textGray }]}
            >
              Документы · личность · устройство
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textGray} />
        </TouchableOpacity>

        {/* Блок со статистикой (Курьер / Заказчик) */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.white }]}>
            <Text style={[styles.statLabel, { color: colors.textGray }]}>
              Я курьер
            </Text>
            <View style={styles.statValueRow}>
              <Text style={[styles.statValue, { color: colors.textDark }]}>
                4,9
              </Text>
              <Ionicons name="star" size={16} color={colors.primary} />
            </View>
            <Text style={[styles.statSub, { color: colors.textGray }]}>
              12 доставок
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.white }]}>
            <Text style={[styles.statLabel, { color: colors.textGray }]}>
              Я заказчик
            </Text>
            <View style={styles.statValueRow}>
              <Text style={[styles.statValue, { color: colors.textDark }]}>
                5,0
              </Text>
              <Ionicons name="star" size={16} color={colors.primary} />
            </View>
            <Text style={[styles.statSub, { color: colors.textGray }]}>
              7 заказов
            </Text>
          </View>
        </View>

        {/* Карточка уровня (Тёмная) */}
        <View
          style={[styles.levelCard, { backgroundColor: colors.darkButton }]}
        >
          <View style={styles.levelHeader}>
            <Text style={styles.levelLabel}>Ваш уровень</Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>Новичок</Text>
            </View>
          </View>
          <Text style={styles.levelTitle}>Заказы до 1 000 ₽</Text>
          <Text style={styles.levelDesc}>Средний рейтинг → до 3 000 ₽</Text>
          <Text style={styles.levelDesc}>Высокий рейтинг → крупные заказы</Text>
        </View>

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
          <View
            style={[styles.iconBox, { backgroundColor: colors.lightPurple }]}
          >
            <MaterialCommunityIcons
              name="cube-outline"
              size={22}
              color={colors.primary}
            />
          </View>
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
  accountStatusCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  accountStatusText: {
    flex: 1,
  },
  accountStatusTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  accountStatusDesc: {
    fontSize: 13,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
  },
  statLabel: {
    fontSize: 13,
    marginBottom: 8,
  },
  statValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
  },
  statSub: {
    fontSize: 12,
  },
  levelCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  levelLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
  },
  levelBadge: {
    backgroundColor: "#C8F58B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  levelDesc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 4,
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
