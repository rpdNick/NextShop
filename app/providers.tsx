'use client';

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { ModalProvider } from "./components/Modal/ModalContext";
import { useAuthListener } from "@/lib/hooks/useAuthListener";

function AuthListener() {
  useAuthListener();
  return null;
}

// Centralized client-side providers to keep the server layout clean.
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ModalProvider>
        <AuthListener />
        {children}
      </ModalProvider>
    </Provider>
  );
}

