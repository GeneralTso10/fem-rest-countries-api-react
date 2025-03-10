import MoonIcon from "../assets/moon-icon.svg?react";
import MoonIconDark from "../assets/moon-icon-dark.svg?react";
import { useThemeContext } from "../context/ThemeContext";

export function Header() {
    const { theme, toggleTheme } = useThemeContext();

    function handleChangeThemeClick() {
        toggleTheme();
    }

    return (
        <header>
            <div className="header-content">
                <h1>Where in the world?</h1>
                <button type="button" className="btn-with-icon" style={{ boxShadow: "none" }} onClick={handleChangeThemeClick}>
                    {theme === "dark" ? <MoonIconDark /> : <MoonIcon />}
                    Dark Mode
                </button>
            </div>
        </header>
    );
}