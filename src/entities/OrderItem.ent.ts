export interface OrderItem {
  id: number;
  createdAt: string;
  updatedAt: string;
  orderId: number;

  title: string;
  quantity: string;
  note: string | null;

  isPurchased: boolean;
}

export type CreateOrderItemDto = Omit<
  OrderItem,
  "id" | "createdAt" | "updatedAt" | "orderId" | "isPurchased"
>;
