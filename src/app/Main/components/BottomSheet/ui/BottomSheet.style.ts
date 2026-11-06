import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    borderRadius: 32,
    padding: 24,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
    opacity: 0.3,
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
