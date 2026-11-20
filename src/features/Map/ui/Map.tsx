import { useEffect, useState, type FC } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { YandexMapView, initialize } from "expo-yandex-mapkit";
import { useUserLocation } from "../hooks/use-user-location";
import { CustomMarker } from "./CustomMarker";
import { bottomSheetStateStore } from "@/shared/BottomSheet/stores/BottomSheetState.store";

const SEVASTOPOL = { latitude: 44.6166, longitude: 33.5254 };

export const Map: FC = () => {
  const scheme = useColorScheme();
  const [ready, setReady] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  const [selectedPoint, setSelectedPoint] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const { location: userLocation, error } = useUserLocation();

  useEffect(() => {
    initialize(process.env.EXPO_PUBLIC_YMAP_API_KEY as string)
      .then(() => setReady(true))
      .catch((err) => console.error("MapKit init failed:", err));
  }, []);

  if (!ready) return null;

  return (
    <YandexMapView
      style={StyleSheet.absoluteFill}
      cameraPosition={{
        latitude: userLocation?.latitude ?? SEVASTOPOL.latitude,
        longitude: userLocation?.longitude ?? SEVASTOPOL.longitude,
        zoom: 15,
      }}
      nightMode={scheme === "dark"}
      onMapReady={() => setMapReady(true)}
      onMapPress={({ nativeEvent }) => {
        setSelectedPoint(nativeEvent.point);
        bottomSheetStateStore.nextPage();
      }}
    >
      {mapReady && (
        <>
          {selectedPoint && (
            <CustomMarker point={selectedPoint} iconName="vector-point" />
          )}
          {userLocation && (
            <CustomMarker point={userLocation} iconName="human" />
          )}
        </>
      )}
    </YandexMapView>
  );
};
