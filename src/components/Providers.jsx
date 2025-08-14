"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "sonner";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <Toaster position="top-right" richColors />
      {children}
    </Provider>
  );
}
