import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  contentContainer: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  sheetTitle: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 4,
  },
  sheetSubtitle: {
    fontSize: 15,
    marginBottom: 20,
  },
  categoriesScroll: {
    marginBottom: 20,
    marginHorizontal: -24,
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: "600",
  },
  placeCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  placeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  placeInfo: { flex: 1 },
  placeName: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  placeDetails: {
    fontSize: 13,
  },
  primaryButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    borderRadius: 16,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: "600",
  },
});
