import { observer } from "mobx-react-lite";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useColors } from "@shared/hooks/use-colors";
import { ScrollLayout } from "@shared/ui/ScrollLayout";
import { useMe } from "@features/auth/hooks/useMe";
import { SafeBg } from "@shared/ui/SafeBg";
import { CourierLevel } from "@widgets/CourierLevel";
import { AccountStat } from "@widgets/AccountStats";
import { BoxIcon } from "@shared/ui/BoxIcon";
import { formatJoinedIn } from "@shared/utils/formatJoinedIn";
import { AccountHeader } from "../../widgets/AccountHeader";

export default observer(function ProfileScreen() {
  const colors = useColors();
  const { data: user, isLoading, isError } = useMe();

  if (isLoading) {
    return (
      <SafeBg>
        <ScrollLayout>
          <View style={[styles.center, { backgroundColor: colors.background }]}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        </ScrollLayout>
      </SafeBg>
    );
  }

  if (isError || !user) {
    return (
      <SafeBg>
        <ScrollLayout inRefreshQueriesToInvalidate={[["me"]]}>
          <View style={[styles.center, { backgroundColor: colors.background }]}>
            <Text style={{ color: colors.textDark }}>
              Не удалось загрузить профиль
            </Text>
          </View>
        </ScrollLayout>
      </SafeBg>
    );
  }

  const joinedIn = formatJoinedIn(user.createdAt);
  const courierLevel: "starter" | "intermediate" | "pro" =
    user.courierRatingCount < 10
      ? "starter"
      : user.courierRatingCount < 25
        ? "intermediate"
        : "pro";

  return (
    <SafeBg>
      <ScrollLayout inRefreshQueriesToInvalidate={[["me"]]}>
        <AccountHeader
          name={user.name}
          surname={user.surname}
          joinedIn={joinedIn}
        />
        {/* <AccountVerificationLevel level="pro" /> */}
        {/* <BalanceCard balance="2 480" /> */}
        <CourierLevel level={courierLevel} />

        <View style={styles.statsRow}>
          <AccountStat
            header="Я курьер"
            points={user.courierRating}
            description={`${user.courierRatingCount} доставок`}
          />
          <AccountStat
            header="Я заказчик"
            points={user.clientRating}
            description={`${user.clientRatingCount} доставок`}
          />
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
