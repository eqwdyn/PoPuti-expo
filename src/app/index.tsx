import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Platform } from "react-native";
// import { YandexMapView, MarkerView } from "expo-yandex-mapkit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../widgets/Header";
import { ModeToggle } from "../PagesComponents/Main/ModeToggle";
import { useColors } from "../shared/hooks/use-colors";
import { MapSearch } from "../PagesComponents/Main/MapSearch";
import { BottomSheet } from "../PagesComponents/Main/BottomSheet";

// Константы для отступов
const BOTTOM_NAV_HEIGHT = Platform.OS === "ios" ? 90 : 70;
const MAP_CENTER = { latitude: 55.7539, longitude: 37.6208 };

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<"courier" | "customer">(
    "customer",
  );
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/*
      <YandexMapView
        style={StyleSheet.absoluteFill}
        cameraPosition={{ ...MAP_CENTER, zoom: 15 }}
      >
        <MarkerView
          point={{ latitude: 55.756, longitude: 37.622 }}
          anchor={{ x: 0.5, y: 1 }} 
        >
          <View style={styles.markerContainer}>
            <View style={[styles.markerIconBg, { backgroundColor: colors.white }]}>
              <MaterialCommunityIcons
                name="coffee"
                size={20}
                color={colors.primary}
              />
            </View>
            <View style={[styles.markerLabel, { backgroundColor: colors.white }]}>
              <Text style={[styles.markerLabelText, { color: colors.textDark }]}>Кофе на углу</Text>
            </View>
          </View>
        </MarkerView>
      </YandexMapView>
      */}
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: colors.background },
        ]}
      />

      <SafeAreaView style={styles.topOverlay} pointerEvents="box-none">
        <Header />
        <ModeToggle activeTab={activeTab} setActiveTab={setActiveTab} />
        {/* <MapSearch /> */}

        {/* <View style={styles.geoButtonContainer}>
          <TouchableOpacity
            style={[styles.geoButton, { backgroundColor: colors.white }]}
          >
            <MaterialCommunityIcons
              name="crosshairs-gps"
              size={24}
              color={colors.textDark}
            />
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>

      <BottomSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topOverlay: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  geoButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20,
    marginTop: 10,
  },
  geoButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  markerContainer: { alignItems: "center" },
  markerIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginBottom: 6,
  },
  markerLabel: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    elevation: 3,
  },
  markerLabelText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
