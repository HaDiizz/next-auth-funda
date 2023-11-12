"use client";
import { createContext } from "react";
import AuthProvider from "./AuthProvider";
import useLocalStorage from "@/hooks/use-local-storage";
import { NextUIProvider } from "@nextui-org/react";

export const AppContext = createContext({
  font: "Default",
  setFont: () => {},
});

export default function Providers({ children, session }) {
  const [font, setFont] = useLocalStorage("next__content", "Default");

  return (
    <AuthProvider session={session}>
      <NextUIProvider>
        <AppContext.Provider
          value={{
            font,
            setFont,
          }}
        >
          {children}
        </AppContext.Provider>
      </NextUIProvider>
    </AuthProvider>
  );
}
