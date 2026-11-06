import { Colors } from "../constants/theme";
import { useColorScheme } from "./use-color-scheme.web";

export function useColors() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "dark" ? "dark" : "light"];
  return colors;
}
