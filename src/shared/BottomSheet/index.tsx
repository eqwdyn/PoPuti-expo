import { observer } from "mobx-react-lite";
import { BottomSheetProxy } from "./components/BottomSheetProxy";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { bottomSheetStateStore } from "./stores/BottomSheetState.store";
import { Starter } from "./screens/client/Starter";
import { MakeOrderContent } from "./screens/client/MakeOrder";

export const BottomSheet = observer(() => {
  return (
    <BottomSheetProxy>
      <BottomSheetScrollView
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {bottomSheetStateStore.mode === "client" &&
          bottomSheetStateStore.page === 0 && <Starter />}

        {bottomSheetStateStore.mode === "client" &&
          bottomSheetStateStore.page === 1 && <MakeOrderContent />}
      </BottomSheetScrollView>
    </BottomSheetProxy>
  );
});
