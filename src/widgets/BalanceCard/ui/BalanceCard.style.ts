import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  balanceCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  withdrawButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  withdrawText: {
    fontSize: 14,
    fontWeight: "600",
  },
  balanceNote: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },
});
