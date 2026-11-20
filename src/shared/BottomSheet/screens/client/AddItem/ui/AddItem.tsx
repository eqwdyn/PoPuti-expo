import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useColors } from "@shared/hooks/use-colors";
import { styles } from "./AddItem.style";
import { Header } from "../../../../components/Header";
import { InputGroup } from "../../../../components/InputGroup";

export const AddItemContent = ({ onCancel }: { onCancel: () => void }) => {
  const colors = useColors();
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");

  return (
    <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
      <Header
        title="Добавить товар"
        subtitle="Укажите название, количество и пожелания"
      />

      {/* Название товара */}
      {/* <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: colors.textDark }]}>
          Название товара
        </Text>
        <BottomSheetTextInput
          style={[
            styles.input,
            { backgroundColor: colors.background, color: colors.textDark },
          ]}
          placeholder="Например, Бананы"
          placeholderTextColor={colors.textGray}
          value={title}
          onChangeText={setTitle}
        />
      </View> */}
      <InputGroup
        label="Количество"
        value={title}
        setValue={setTitle}
        placeholder="Например, Бананы"
      />

      {/* Количество */}
      {/* <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: colors.textDark }]}>
          Количество
        </Text>
        <BottomSheetTextInput
          style={[
            styles.input,
            { backgroundColor: colors.background, color: colors.textDark },
          ]}
          placeholder="1 кг"
          placeholderTextColor={colors.textGray}
          value={quantity}
          onChangeText={setQuantity}
        />
        <Text style={[styles.hint, { color: colors.textGray }]}>
          Например: 2 шт, 500 г или 1 упаковка
        </Text>
      </View> */}
      <InputGroup
        label="Количество"
        hint="Например: 2 шт, 500 г или 1 упаковка"
        value={quantity}
        setValue={setQuantity}
        placeholder="1 кг"
      />

      {/* Примечание */}
      {/* <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
          <Text style={[styles.label, { color: colors.textDark }]}>
            Примечание
          </Text>
          <Text style={[styles.optional, { color: colors.textGray }]}>
            Необязательно
          </Text>
        </View>
        <BottomSheetTextInput
          style={[
            styles.input,
            styles.textArea,
            { backgroundColor: colors.background, color: colors.textDark },
          ]}
          placeholder="Например: Спелые, без тёмных пятен"
          placeholderTextColor={colors.textGray}
          value={note}
          onChangeText={setNote}
          multiline
          textAlignVertical="top"
        />
      </View> */}
      <InputGroup
        label="Примечание"
        optional="Необязательное"
        value={note}
        setValue={setNote}
        placeholder="Например: Спелые, без тёмных пятен"
        multiline
        textAlignVertical="top"
      />

      {/* Разделитель */}
      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {/* Кнопки */}
      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: colors.primary }]}
      >
        <Text style={styles.submitButtonText}>Добавить в заказ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={[styles.cancelButtonText, { color: colors.textGray }]}>
          Отмена
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
