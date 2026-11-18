import { makeAutoObservable } from "mobx";

const VALID_MODES = ["client", "courier"] as const;
type Mode = (typeof VALID_MODES)[number];
type Page = 0 | 1 | 2;
type CurSnapPoint = 0 | 1 | 2;

class BottomSheetStateStore {
  mode: Mode = "client";
  page: Page = 0;
  curSnapPoint: CurSnapPoint = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setMode(mode: Mode) {
    if (!VALID_MODES.includes(mode)) return;
    this.mode = mode;
  }

  setCurSnapPoint(point: CurSnapPoint) {
    this.curSnapPoint = point;
  }

  startPage() {
    this.page = 0;
  }

  nextPage() {
    if (this.page === 2) {
      this.page = 0;
      return;
    }

    if (this.page === 0) {
      this.page = 1;
      this.curSnapPoint = 1;
    }
  }
}

export const bottomSheetStateStore = new BottomSheetStateStore();
