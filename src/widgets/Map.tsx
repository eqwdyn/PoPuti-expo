import type { FC } from "react";
import { StyleSheet, View } from "react-native";

interface Props {}

// Константы для отступов
// const BOTTOM_NAV_HEIGHT = Platform.OS === "ios" ? 90 : 70;
// const MAP_CENTER = { latitude: 55.7539, longitude: 37.6208 };

export const Map: FC<Props> = ({}) => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        //   { backgroundColor: colors.background },
        { backgroundColor: "#fff" },
      ]}
    />

    //   <YandexMapView
    //     style={StyleSheet.absoluteFill}
    //     cameraPosition={{ ...MAP_CENTER, zoom: 15 }}
    //   >
    //     <MarkerView
    //       point={{ latitude: 55.756, longitude: 37.622 }}
    //       anchor={{ x: 0.5, y: 1 }}
    //     >
    //       <View style={styles.markerContainer}>
    //         <View style={[styles.markerIconBg, { backgroundColor: colors.white }]}>
    //           <MaterialCommunityIcons
    //             name="coffee"
    //             size={20}
    //             color={colors.primary}
    //           />
    //         </View>
    //         <View style={[styles.markerLabel, { backgroundColor: colors.white }]}>
    //           <Text style={[styles.markerLabelText, { color: colors.textDark }]}>Кофе на углу</Text>
    //         </View>
    //       </View>
    //     </MarkerView>
    //   </YandexMapView>
  );
};
