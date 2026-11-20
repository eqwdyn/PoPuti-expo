import type { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CreateOrderItemDto } from "@entities/OrderItem.ent";
import { useColors } from "@shared/hooks/use-colors";
import { OrderItem } from "./OrderItem";
import React from "react";

interface Props {
  items: CreateOrderItemDto[];
}

export const OrderList: FC<Props> = ({ items }) => {
  const colors = useColors();

  if (!items || !items.length) return null;

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.textDark }]}>
          Список покупок
        </Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textGray }]}>
          {items.length} позиции
        </Text>
      </View>
      <View
        style={[
          styles.itemsCard,
          { backgroundColor: colors.white, borderColor: colors.border },
        ]}
      >
        {items?.map((item, index) => (
          <React.Fragment key={item.title ?? index}>
            <OrderItem item={item} />
            {index < items.length - 1 && (
              <View
                style={[styles.itemDivider, { backgroundColor: colors.border }]}
              />
            )}
          </React.Fragment>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.lightPurple }]}
      >
        <Text style={[styles.addButtonText, { color: colors.primary }]}>
          + Добавить позицию
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  itemsCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  itemDivider: {
    height: 1,
    marginVertical: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  sectionSubtitle: {
    fontSize: 13,
  },
  addButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 24,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
