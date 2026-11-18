import { OrderItem } from "./OrderItem.ent";
import type { User } from "./User.ent";

export type OrderStatus =
  | "PENDING"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  id: number;
  createdAt: string;
  updatedAt: string;

  clientId: number;
  courierId: number | null;

  pickupAddress: string;
  pickupLat: number;
  pickupLng: number;

  deliveryAddress: string;
  deliveryLat: number;
  deliveryLng: number;

  price: number;
  comment: string | null;

  status: OrderStatus;
  deliveredAt: string | null;

  items?: OrderItem[];
  client?: User;
  courier?: User | null;
}
