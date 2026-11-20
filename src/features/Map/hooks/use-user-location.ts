import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { getDistanceMeters } from "@/shared/utils/get-distance-meters";

interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy: number | null;
}

const ACCURACY_THRESHOLD = 50;
const MAX_SPEED_MPS = 50;

export function useUserLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const lastPointRef = useRef<UserLocation | null>(null);
  const lastTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        setError("Службы геолокации выключены");
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Доступ к геолокации запрещён");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
          distanceInterval: 5,
        },
        (newLocation) => {
          const { latitude, longitude, accuracy } = newLocation.coords;

          if (accuracy !== null && accuracy > ACCURACY_THRESHOLD) return;

          const now = Date.now();
          const point: UserLocation = { latitude, longitude, accuracy };
          const last = lastPointRef.current;

          if (last) {
            const dist = getDistanceMeters(last, point);
            const elapsed = (now - lastTimeRef.current) / 1000;
            if (elapsed > 0 && dist / elapsed > MAX_SPEED_MPS) {
              return;
            }
          }

          lastPointRef.current = point;
          lastTimeRef.current = now;
          setLocation(point);
        },
      );
    })();

    return () => {
      subscription?.remove();
    };
  }, []);

  return { location, error };
}
