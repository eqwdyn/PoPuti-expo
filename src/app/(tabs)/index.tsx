import React, { useState } from "react";
import { SwitchButtons } from "@widgets/SwitchButtons";
import { SafeBg } from "@shared/ui/SafeBg";
import { ScrollLayout } from "@shared/ui/ScrollLayout";
import { Map } from "@/features/Map/ui/Map";
import { bottomSheetStateStore } from "@shared/BottomSheet/stores/BottomSheetState.store";
import { BottomSheet } from "@shared/BottomSheet";

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
