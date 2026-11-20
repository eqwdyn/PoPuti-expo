import { useCallback, useEffect, useMemo, useState } from "react";
import { resetSuggest, suggest } from "expo-yandex-mapkit";
import debounce from "lodash.debounce";
import { type AddressSuggestion } from "../../../../../ui/SuggestionsBox";

export function useAddressSuggestion() {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const items = await suggest(query, { types: ["geo"] });
      setSuggestions(
        items.map((item) => ({
          title: item.title,
          subtitle: item.subtitle,
          center: item.center,
        })),
      );
    } catch (e) {
      console.error("Suggest failed:", e);
      setSuggestions([]);
    }
  }, []);

  const debouncedFetch = useMemo(
    () => debounce(fetchSuggestions, 300),
    [fetchSuggestions],
  );

  useEffect(() => {
    debouncedFetch(address);
    return () => {
      debouncedFetch.cancel();
      resetSuggest();
    };
  }, [address, debouncedFetch]);

  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  return { address, setAddress, suggestions };
}
