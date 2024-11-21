"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ThemeContext } from "@/context/theme";
import { useContext } from "react";

export function Providers({ children }) {
  const themeContext = useContext(ThemeContext);
  const theme = extendTheme(themeContext.theme)
  

  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
}