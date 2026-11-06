import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
    elevation: 3,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  toggleText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
