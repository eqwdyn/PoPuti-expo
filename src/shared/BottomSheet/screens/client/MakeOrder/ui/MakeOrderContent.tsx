import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useColors } from "@shared/hooks/use-colors";
import { styles } from "./MakeOrderContent.style";
import { RoutesCard } from "../components/RoutesCard";
import { Header } from "../../../../components/Header";
import { OrderList } from "../components/OrderList";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { createdOrderItemsStore } from "../../../../stores/OrderItems.store";
import { useAddressSuggestion } from "../hooks/useAddressSuggestion";
import { InputGroup } from "../../../../components/InputGroup";

export const MakeOrderContent = () => {
  const colors = useColors();
  const [price, setPrice] = useState("260");
  const [comment, setComment] = useState("");

  const {
    address: fromAddress,
    setAddress: setFromAddress,
    suggestions: fromSuggestions,
  } = useAddressSuggestion();

  const {
    address: toAddress,
    setAddress: setToAddress,
    suggestions: toSuggestions,
  } = useAddressSuggestion();

  //   TODO: Decompose
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
        fromSuggestions={fromSuggestions}
        toSuggestions={toSuggestions}
        onSelectFrom={(suggestion) => setFromAddress(suggestion.title)}
        onSelectTo={(suggestion) => setToAddress(suggestion.title)}
        // FIXME: Error with closing app on click
      />
      <OrderList items={createdOrderItemsStore.items} />

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
      <InputGroup
        label="Комментарий к заказу"
        placeholder="Например, позвонить у подъезда"
        value={comment}
        setValue={setComment}
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
