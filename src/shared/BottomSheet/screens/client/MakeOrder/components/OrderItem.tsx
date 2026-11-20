import type { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CreateOrderItemDto } from "@entities/OrderItem.ent";
import { useColors } from "@shared/hooks/use-colors";

interface Props {
  item: CreateOrderItemDto;
}

export const OrderItem: FC<Props> = ({ item }) => {
  const colors = useColors();
  return (
    <View>
      <View style={styles.itemRow}>
        <View style={styles.itemInfo}>
          <Text style={[styles.itemTitle, { color: colors.textDark }]}>
            {item.title}
          </Text>
          <Text style={[styles.itemDesc, { color: colors.textGray }]}>
            {item.note}
          </Text>
        </View>
        <View
          style={[styles.quantityBadge, { backgroundColor: colors.background }]}
        >
          <Text style={[styles.quantityText, { color: colors.textDark }]}>
            {item.quantity}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  itemDesc: {
    fontSize: 13,
  },
  quantityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 13,
    fontWeight: "500",
  },
});
