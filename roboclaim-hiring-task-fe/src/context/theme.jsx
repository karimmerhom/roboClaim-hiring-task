"use client";
import React, { useEffect, useState, createContext } from "react";

const pureBlack = "#000000";
const pureWhite = "#FFFFFF";
const primaryGrey = "#F4F7FE";
const darkGrey2 = "#151515";
const secondaryWhite = "#F8F9FA";
const darkGrey = "#232327";
const lightGrey = "#A3AED0";
const lightGrey2 = "#DEDEDE";
const neutralGrey = "#6E727A";
const tertiaryWhite = "#E8ECF4";
const dangerRed = "#bb2124";
const lightGreen = "#80BC33";
const darkGreen = "#ADED5C";

const darkModeColors = {
  background: {
    primary: darkGrey2,
    secondary: darkGrey,
    tertiary: tertiaryWhite,
  },
  button: {
    primaryBackground: pureBlack,
    secondaryBackground: primaryGrey,
    tertiaryBackground: darkGrey,
    primaryText: pureWhite,
    secondaryText: lightGrey,
    tertiaryText: neutralGrey,
  },
  text: {
    primary: pureWhite,
    secondary: lightGrey2,
    tertiary: pureWhite,
    danger: dangerRed,
  },
  border: {
    primaryColor: tertiaryWhite,
    secondaryColor: darkGrey2,
    tertiaryColor: lightGrey,
  },
  icons: {
    primaryColor: pureWhite,
    secondaryColor: darkGreen,
  },
};

const lightModeColors = {
  background: {
    primary: secondaryWhite,
    secondary: pureWhite,
    tertiary: tertiaryWhite,
  },
  button: {
    primaryBackground: pureBlack,
    secondaryBackground: primaryGrey,
    tertiaryBackground: pureWhite,
    primaryText: pureWhite,
    secondaryText: lightGrey,
    tertiaryText: neutralGrey,
  },
  text: {
    primary: pureBlack,
    secondary: neutralGrey,
    tertiary: pureWhite,
    danger: dangerRed,
  },
  border: {
    primaryColor: tertiaryWhite,
    secondaryColor: tertiaryWhite,
    tertiaryColor: darkGrey,
  },
  icons: {
    primaryColor: pureBlack,
    secondaryColor: lightGreen,
  },
};

const ThemeContext = createContext();

function ThemeProvider(props) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setDarkMode(localStorage.getItem("darkmode") === "true");
  }, []);

  useEffect(() => {
    const colors = darkMode ? darkModeColors : lightModeColors;
    const theme = {
      colors,
      fonts: {
        body: "DM Sans, sans-serif",
        heading: "DM Sans, sans-serif",
      },
      fontWeights: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      styles: {
        global: {
          body: {
            bg: "background.secondary",
            fontFamily: "DM Sans, sans-serif",
          },
          html: {
            fontFamily: "DM Sans, sans-serif",
          },
          a: {
            color: "secondary.100",
            _hover: {
              textDecoration: "underline",
            },
          },
        },
      },
      components: {
        Input: {
          variants: {
            textFormField: {
              field: {
                _autofill:{
                  WebkitTextFillColor: colors.text.primary,
                },
                borderWidth: 2,
                borderColor: "border.primaryColor",
                borderRadius: 10,
                padding: 2,
                color: "text.primary",
                boxShadow: `0 0 0px 1000px ${colors.background.secondary} inset`,
                _invalid: {
                  borderColor: "text.danger",
                  borderWidth: 2,
                },
                _focus: {
                  borderWidth: 2,
                  boxShadow: `0 0 0px 1000px ${colors.background.secondary} inset`,
                  borderColor: "border.primaryColor",
                },
                _placeholder: {
                  color: "text.secondary",
                },
              },
            },
          },
        },
        FormLabel: {
          variants: {
            formLabel: {
              lineHeight: 1,
              fontSize: 16,
              marginBottom: 2,
              color: "text.primary",
            },
          },
        },
        Text: {
          variants: {
            formError: {
              m: 0,
              minH: 8,
              fontSize: 14,
              color: "text.danger",
            },
          },
        },
        Button: {
          variants: {
            borderButton: {
              borderWidth: 2,
              borderColor: "border.primaryColor",
              borderRadius: 10,
              backgroundColor: "button.tertiaryBackground",
              padding: 2,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
              gap: 2,
              _hover: {
                backgroundColor: "button.tertiaryBackground",
              },
            },

            solidButton: {
              borderWidth: 2,
              borderColor: "button.primaryBackground",
              borderRadius: 10,
              bg: "button.primaryBackground",
              padding: 2,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
              boxShadow: "primaryShadow",
              gap: 2,
              _hover: {
                backgroundColor: "button.primaryBackground",
              },
              _disabled: {
                opacity: 0.8,
                backgroundColor: "button.primaryBackground",
                cursor: "not-allowed",
                _hover: { bg: "button.primaryBackground" },
              },
            },

            formFieldVisibilityButton: {
              background: "background.secondary",
              hover: {
                backgroundColor: "background.secondary",
              },
              p: 0,
              mr: 2,
            },

            navButtons: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bg: "button.tertiaryBackground",
              boxShadow: "primaryShadow",
              _hover: {
                backgroundColor: "button.tertiaryBackground",
              },
              borderRadius: 100,
              size: "md",
              p: 2,
            },
          },
        },
        baseStyle: {
          Text: {
            primaryFontColor: "primary.100",
            secondaryFontColor: "secondary.100",
          },
        },
      },
      shadows: {
        primaryShadow: darkMode
          ? "5px 10px 15px 5px  rgba(0,0,0,0.5)"
          : "5px 10px 15px 5px rgba(0,0,0,0.3)",
        secondaryShadow: darkMode
          ? "5px 10px 15px 5px  rgba(0,0,0,0.3)"
          : "5px 10px 15px 5px rgba(0,0,0,0.1)",
      },
    };
    setTheme(theme);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const currentValue = localStorage.getItem("darkmode") === "true";
    localStorage.setItem("darkmode", !currentValue);
    setDarkMode(!currentValue);
  };

  if (!mounted) return null;
  return (
    <div>
      <ThemeContext.Provider value={{ theme, toggleDarkMode, darkMode }}>
        {props.children}
      </ThemeContext.Provider>
    </div>
  );
}

export { ThemeContext, ThemeProvider };
