import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    minHeight: 48,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  dividerLine: {
    height: 1,
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 8,
  },
  priceInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    height: "100%",
  },
  currency: {
    fontSize: 16,
    fontWeight: "500",
  },
  hint: {
    fontSize: 12,
    marginBottom: 24,
  },
  submitButton: {
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
