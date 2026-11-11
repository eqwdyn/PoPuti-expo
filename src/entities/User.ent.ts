import type { Order } from "./Order.ent";

export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;

  login: string;

  name: string;
  surname: string;
  phone: string;

  courierRating: number | null;
  courierRatingCount: number;

  clientRating: number | null;
  clientRatingCount: number;

  clientOrders?: Order[];
  courierOrders?: Order[];
}
