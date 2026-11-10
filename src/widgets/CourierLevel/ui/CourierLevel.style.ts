import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  levelCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  levelLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
  },
  levelBadge: {
    backgroundColor: "#C8F58B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  levelDesc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 4,
  },
});
