"use client";
import React, { useContext } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { ThemeContext } from "@/context/theme";
import { IconButton } from "@chakra-ui/react";

function  ThemeButton({noShadow}) {
  const themCtx = useContext(ThemeContext);
  return (
    <IconButton
      aria-label="toggle dark mode"
      variant={'navButtons'}
      boxShadow={noShadow ? 'unset': 'primaryShadow'}
      onClick={themCtx.toggleDarkMode}
      icon={
        themCtx.darkMode ? (
          <MdLightMode
            size={18}
            color={themCtx?.theme.colors['icons']['primaryColor']}
          />
        ) : (
          <MdDarkMode
            size={18}
            color={themCtx?.theme.colors['icons']['primaryColor']}
          />
        )
      }
    />
  );
}

export default ThemeButton;
