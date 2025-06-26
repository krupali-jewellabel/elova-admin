"use client";

import { StoreClientProvider } from "@/components/MenusUI/ProductManagement/context";

export function ModulesProvider({ children }) {
  return <StoreClientProvider>{children}</StoreClientProvider>;
}
