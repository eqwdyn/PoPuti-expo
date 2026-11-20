import type { FC, PropsWithChildren } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useColors } from "../hooks/use-colors";

export interface AddressSuggestion {
  title: string;
  subtitle?: string;
}

interface Props extends PropsWithChildren {
  show: boolean;
  suggestions: AddressSuggestion[];
  onPress: (s: AddressSuggestion) => void;
}

export const SuggestionsBox: FC<Props> = ({
  show,
  suggestions,
  onPress,
  children,
}) => {
  const colors = useColors();
  return (
    <View style={styles.container}>
      {children}
      {show && (
        <View
          style={[
            styles.suggestionsBox,
            { backgroundColor: colors.white, borderColor: colors.border },
          ]}
        >
          {suggestions.map((s, i) => (
            <TouchableOpacity
              key={`${s.title}-${i}`}
              style={[
                styles.suggestionItem,
                i < suggestions.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                },
              ]}
              onPress={() => onPress(s)}
            >
              <Text
                style={[styles.suggestionTitle, { color: colors.textDark }]}
              >
                {s.title}
              </Text>
              {s.subtitle && (
                <Text
                  style={[
                    styles.suggestionSubtitle,
                    { color: colors.textGray },
                  ]}
                >
                  {s.subtitle}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative", // База для абсолютного позиционирования подсказок
    zIndex: 10, // Чтобы подсказки были поверх соседних элементов
  },
  suggestionsBox: {
    position: "absolute", // Вырываем из потока — контент ниже не сдвигается
    top: "100%", // Сразу под инпутом
    left: 36, // Выравнивание под текст (как было marginLeft)
    right: 0, // Растягиваем по ширине контейнера
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    zIndex: 100, // Поверх других элементов внутри SuggestionsBox
    elevation: 5, // Тень на Android
    shadowColor: "#000", // Тень на iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  suggestionItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  suggestionTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  suggestionSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
});
