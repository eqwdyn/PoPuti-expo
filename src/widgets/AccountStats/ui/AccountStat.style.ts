import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
  },
  statLabel: {
    fontSize: 13,
    marginBottom: 8,
  },
  statValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
  },
  statSub: {
    fontSize: 12,
  },
});
