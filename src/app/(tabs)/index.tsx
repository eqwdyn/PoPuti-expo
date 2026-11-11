import React, { useState } from "react";
import { SwitchButtons } from "@widgets/SwitchButtons";
import { SafeBg } from "@shared/ui/SafeBg";
import { ScrollLayout } from "@shared/ui/ScrollLayout";
import { Map } from "../../widgets/Map";
import { BottomSheet } from "../../widgets/BottomSheet";

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
