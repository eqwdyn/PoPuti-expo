import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import type { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColors } from "@shared/hooks/use-colors";
import { AddressSuggestion, SuggestionsBox } from "@shared/ui/SuggestionsBox";

interface Props {
  route: string;
  setRoute: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSelect: (suggestion: AddressSuggestion) => void;
  suggestions: AddressSuggestion[];
  showSuggestions: boolean;
  title: string;
  index: number;
}

export const RouteCard: FC<Props> = ({
  route,
  setRoute,
  onFocus,
  onBlur,
  suggestions,
  onSelect,
  showSuggestions,
  title,
  index,
}) => {
  const colors = useColors();
  return (
    <SuggestionsBox
      show={showSuggestions}
      onPress={onSelect}
      suggestions={suggestions}
    >
      <View style={styles.routeRow}>
        <View style={[styles.circle, { backgroundColor: colors.lightPurple }]}>
          <Text style={{ color: colors.primary, fontWeight: "600" }}>
            {index}
          </Text>
        </View>
        <View style={styles.routeTextContainer}>
          <Text style={[styles.routeLabel, { color: colors.textGray }]}>
            {title}
          </Text>
          <BottomSheetTextInput
            style={[styles.routeInput, { color: colors.textDark }]}
            value={route}
            onChangeText={setRoute}
            placeholder="Введите адрес"
            placeholderTextColor={colors.textGray}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </View>
      </View>
    </SuggestionsBox>
  );
};

const styles = StyleSheet.create({
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  routeTextContainer: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  routeInput: {
    fontSize: 15,
    fontWeight: "600",
    padding: 0,
    margin: 0,
    height: 20,
  },
  divider: {
    height: 1,
    marginVertical: 12,
    marginLeft: 36,
  },
  suggestionsBox: {
    marginTop: 8,
    marginLeft: 36,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
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
