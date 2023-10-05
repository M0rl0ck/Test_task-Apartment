"use client";

import IAsteroidApproach from "@/interfaces/IAsteroidApproach";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export const CartDataContext = createContext<IAsteroidApproach[]>([]);
export const SetCartDataContext = createContext<Dispatch<
  SetStateAction<IAsteroidApproach[]>
> | null>(null);
export const IsLunContext = createContext<boolean>(false);
export const SetIsLunContext = createContext<Dispatch<
  SetStateAction<boolean>
> | null>(null);

function CartDataContextProvider({ children }: { children: React.ReactNode }) {
  const [cartData, setCartData] = useState<IAsteroidApproach[]>([]);
  const [isLun, setIsLun] = useState<boolean>(false);
  return (
    <CartDataContext.Provider value={cartData}>
      <SetCartDataContext.Provider value={setCartData}>
        <IsLunContext.Provider value={isLun}>
          <SetIsLunContext.Provider value={setIsLun}>
            {children}
          </SetIsLunContext.Provider>
        </IsLunContext.Provider>
      </SetCartDataContext.Provider>
    </CartDataContext.Provider>
  );
}

export { CartDataContextProvider };
