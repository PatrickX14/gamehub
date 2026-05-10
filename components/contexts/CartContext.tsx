import { ProductData } from "@/app/lib/api/admin/products";
import { createContext } from "react";

type CartContextType = Omit<ProductData, "status" | "createdAt">;

export const CartContext = createContext<CartContextType[]>([]);
