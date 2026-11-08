import React, { useCallback, useRef, PropsWithChildren } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { styles } from "./BottomSheetProxy.style";
import { useColors } from "@shared/hooks/use-colors";

export const BottomSheetProxy = ({ children }: PropsWithChildren) => {
  const colors = useColors();

  // Ref для управления шторкой извне (например, при нажатии на карточку)
  const bottomSheetRef = useRef<BottomSheet>(null);

  //   const snapPoints = useMemo(() => , []);

  // Функция для рендера затемненного фона
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0}
        pressBehavior="collapse"
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0} // Индекс начальной позиции (0 = 35%)
      snapPoints={["17%"]}
      enablePanDownToClose={false} // Запрещаем закрывать шторку полностью (она нужна на экране)
      backdropComponent={renderBackdrop}
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
      <BottomSheetView
        style={[styles.contentContainer, { backgroundColor: colors.white }]}
      >
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};
