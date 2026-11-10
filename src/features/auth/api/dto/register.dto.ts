import { User } from "@entities/User.ent";

export type RegisterDto = Omit<User, "id" | "createdAt" | "updatedAt"> & {
  password: string;
};
