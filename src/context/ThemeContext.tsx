import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

type ThemeType = "dark" | "light";

type ThemeContextValue = {
    theme: ThemeType;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: "dark", toggleTheme: () => undefined });

export function ThemeContextProvider({ children }: { children: ReactNode }) {
    const [activeTheme, setActiveTheme] = useState<ThemeType>("dark");

    useEffect(() => {
        let theme: ThemeType = "dark";
        if (window.matchMedia('(prefers-color-scheme: light)').matches || localStorage.getItem("theme") === "light")
            theme = "light";

        changeActiveTheme(theme);
    }, []);

    function changeActiveTheme(theme: ThemeType) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        setActiveTheme(theme);
    }

    const toggleTheme = useCallback(() => {
        changeActiveTheme(activeTheme === "dark" ? "light" : "dark");
    }, [activeTheme, changeActiveTheme]);

    const ctxValue = useMemo(() => ({
        theme: activeTheme,
        toggleTheme,
    }), [activeTheme, toggleTheme]);

    return (
        <ThemeContext.Provider value={ctxValue}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    const ctx = useContext(ThemeContext);
    return ctx;
}