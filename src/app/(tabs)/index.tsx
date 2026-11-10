import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useColors } from "@shared/hooks/use-colors";
import { SwitchButtons } from "@widgets/SwitchButtons";
import { BottomSheet } from "../../PagesComponents/Main/BottomSheet";
import { SafeBg } from "@shared/ui/SafeBg";
import { ScrollLayout } from "@shared/ui/ScrollLayout";
import { Map } from "../../widgets/Map";

export default function HomeScreen() {
  const switchTabs = ["Я заказчик", "Я курьер"];
  const [activeTab, setActiveTab] = useState<string>("Я заказчик");

  return (
    <>
      <SafeBg>
        <ScrollLayout>
          <Map />
          <SwitchButtons
            activeItem={activeTab}
            setActiveItem={setActiveTab}
            items={switchTabs}
          />
        </ScrollLayout>
      </SafeBg>

      <BottomSheet />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topOverlay: {
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
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
