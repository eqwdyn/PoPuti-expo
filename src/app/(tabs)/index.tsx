import React, { useState } from "react";
import { SwitchButtons } from "@widgets/SwitchButtons";
import { SafeBg } from "@shared/ui/SafeBg";
import { ScrollLayout } from "@shared/ui/ScrollLayout";
import { Map } from "@features/MapPanel/ui/Map";
import { BottomSheet } from "@features/MapPanel/ui/BottomSheet";
import { bottomSheetStateStore } from "@features/MapPanel/stores/BottomSheetState.store";

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
            setActiveItem={(item) => {
              setActiveTab(item);
              bottomSheetStateStore.setMode(
                item === "Я заказчик" ? "client" : "courier",
              );
            }}
            items={switchTabs}
          />
        </ScrollLayout>
      </SafeBg>

      <BottomSheet />
    </>
  );
}
