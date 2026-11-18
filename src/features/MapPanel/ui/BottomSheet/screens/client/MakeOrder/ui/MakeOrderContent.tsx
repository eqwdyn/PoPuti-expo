import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useColors } from "@shared/hooks/use-colors";
import { styles } from "./MakeOrderContent.style";
import { CreateOrderItemDto } from "@entities/OrderItem.ent";
import { RoutesCard } from "../components/RoutesCard";
import { Header } from "../../../../components/Header";
import { OrderList } from "../components/OrderList";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

const MOCK_ITEMS: CreateOrderItemDto[] = [
  { title: "Молоко", note: "2,5–3,2%, любой марки", quantity: "1 л" },
  { title: "Хлеб", note: "Ржаной, нарезанный", quantity: "1 шт." },
  { title: "Яблоки", note: "Зелёные, не кислые", quantity: "1 кг" },
];

export const MakeOrderContent = () => {
  const colors = useColors();
  const [price, setPrice] = useState("260");
  const [comment, setComment] = useState("");
  const [fromAddress, setFromAddress] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");

  return (
    <>
      <Header
        title="Что доставить?"
        subtitle="Вы решаете, что и откуда привезти"
      />
      <RoutesCard
        from={fromAddress}
        setFrom={setFromAddress}
        to={toAddress}
        setTo={setToAddress}
      />
      <OrderList items={MOCK_ITEMS} />

      <Text style={[styles.label, { color: colors.textDark }]}>
        Комментарий к заказу
      </Text>
      <BottomSheetTextInput
        style={[
          styles.input,
          { backgroundColor: colors.background, color: colors.textDark },
        ]}
        placeholder="Например, позвонить у подъезда"
        placeholderTextColor={colors.textGray}
        value={comment}
        onChangeText={setComment}
        multiline
      />

      <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />

      <Text style={[styles.label, { color: colors.textDark }]}>
        Стоимость доставки
      </Text>
      <View
        style={[styles.priceContainer, { backgroundColor: colors.background }]}
      >
        <BottomSheetTextInput
          style={[styles.priceInput, { color: colors.textDark }]}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <Text style={[styles.currency, { color: colors.textGray }]}>₽</Text>
      </View>
      <Text style={[styles.hint, { color: colors.textGray }]}>
        Вы сами назначаете стоимость доставки
      </Text>

      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: colors.primary }]}
      >
        <Text style={styles.submitButtonText}>Оформить заказ</Text>
      </TouchableOpacity>
    </>
  );
};
