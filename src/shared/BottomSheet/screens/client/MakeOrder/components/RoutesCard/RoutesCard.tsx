import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useColors } from "@shared/hooks/use-colors";
import { AddressSuggestion } from "../../../../../../ui/SuggestionsBox";
import { RouteCard } from "./components/RouteCard";

interface Props {
  from: string;
  setFrom: (text: string) => void;
  fromSuggestions: AddressSuggestion[];
  onSelectFrom: (suggestion: AddressSuggestion) => void;

  to: string;
  setTo: (text: string) => void;
  toSuggestions: AddressSuggestion[];
  onSelectTo: (suggestion: AddressSuggestion) => void;
}

export const RoutesCard: FC<Props> = ({
  from,
  setFrom,
  fromSuggestions,
  onSelectFrom,
  to,
  setTo,
  toSuggestions,
  onSelectTo,
}) => {
  const colors = useColors();
  const [focusedField, setFocusedField] = useState<"from" | "to" | null>(null);

  const handleBlur = () => {
    setTimeout(() => setFocusedField(null), 150);
  };

  return (
    <View style={[styles.routeCard, { backgroundColor: colors.background }]}>
      <RouteCard
        index={1}
        title="Откуда забрать"
        route={from}
        setRoute={setFrom}
        onFocus={() => setFocusedField("from")}
        onBlur={handleBlur}
        suggestions={fromSuggestions}
        showSuggestions={focusedField === "from" && fromSuggestions.length > 0}
        onSelect={(suggestion) => {
          onSelectFrom(suggestion);
          setFocusedField(null);
        }}
      />

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <RouteCard
        index={2}
        title="Куда доставить"
        route={to}
        setRoute={setTo}
        onFocus={() => setFocusedField("to")}
        onBlur={handleBlur}
        suggestions={toSuggestions}
        showSuggestions={focusedField === "to" && toSuggestions.length > 0}
        onSelect={(suggestion) => {
          onSelectTo(suggestion);
          setFocusedField(null);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  routeCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    marginVertical: 12,
    marginLeft: 36,
  },
});
