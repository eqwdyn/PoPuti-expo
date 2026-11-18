import { makeAutoObservable } from "mobx";
import { CreateOrderItemDto } from "@entities/OrderItem.ent";

type RandomId = `${string}-${string}-${string}-${string}-${string}`;

class CreatedOrderItemsStore {
  items: (CreateOrderItemDto & {
    id: RandomId;
  })[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addItem(item: CreateOrderItemDto) {
    const id = crypto.randomUUID();
    this.items.push({ ...item, id: id });
  }

  removeItem(id: RandomId) {
    this.items = this.items.filter((cur) => cur.id !== id);
  }
}

export const createdOrderItemsStore = new CreatedOrderItemsStore();
