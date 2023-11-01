import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

type ColorModes = "DARK" | "LIGHT";

type SettingsContextProvider = {
  colorMode: ColorModes;
  handleSetColorMode: (mode: ColorModes) => void;
};

export const SettingsContextState = createContext<SettingsContextProvider>(
  {} as SettingsContextProvider
);

type Props = {
  children: ReactElement;
};

export const SettingsContext = ({ children }: Props) => {
  const [colorMode, setColorMode] = useState<ColorModes>("DARK");

  useEffect(() => {
    if (localStorage.getItem("colorMode") === null) return;
    setColorMode(localStorage.getItem("colorMode") as ColorModes);
  }, []);

  function handleSetColorMode(mode: ColorModes) {
    setColorMode(mode);
    localStorage.setItem("colorMode", mode);
  }

  return (
    <SettingsContextState.Provider
      value={{
        colorMode,
        handleSetColorMode,
      }}
    >
      {children}
    </SettingsContextState.Provider>
  );
};

export function useSettingsContext() {
  const context = useContext(SettingsContextState);

  if (!context) {
    throw new Error("useSettingsContext must be used within a SettingsContext");
  }

  return context;
}
