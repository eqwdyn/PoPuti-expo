import React, { useRef, PropsWithChildren } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { useColors } from "@shared/hooks/use-colors";
import { observer } from "mobx-react-lite";
import { bottomSheetStateStore } from "../stores/BottomSheetState.store";

export const BottomSheetProxy = observer(({ children }: PropsWithChildren) => {
  const colors = useColors();
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={bottomSheetStateStore.curSnapPoint}
      snapPoints={["15%"]}
      maxDynamicContentSize={680}
      enablePanDownToClose={false}
      enableDynamicSizing={true}
      backgroundStyle={{
        backgroundColor: colors.white,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
      handleIndicatorStyle={{
        backgroundColor: colors.textGray,
        width: 40,
        opacity: 0.3,
      }}
    >
      {children}
    </BottomSheet>
  );
});
