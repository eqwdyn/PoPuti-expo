import { makeAutoObservable } from "mobx";
import { CreateOrderItemDto } from "@entities/OrderItem.ent";

const MOCK_ITEMS: CreateOrderItemDto[] = [
  { title: "Молоко", note: "2,5–3,2%, любой марки", quantity: "1 л" },
  { title: "Хлеб", note: "Ржаной, нарезанный", quantity: "1 шт." },
  { title: "Яблоки", note: "Зелёные, не кислые", quantity: "1 кг" },
];

class CreatedOrderItemsStore {
  items: (CreateOrderItemDto & {
    id: number;
  })[] = [];
  private _nextId = 1;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    for (const item of MOCK_ITEMS) {
      this.addItem(item);
    }
  }

  addItem(item: CreateOrderItemDto) {
    this.items.push({ ...item, id: this._nextId++ });
  }

  removeItem(id: number) {
    this.items = this.items.filter((cur) => cur.id !== id);
  }
}

export const createdOrderItemsStore = new CreatedOrderItemsStore();
