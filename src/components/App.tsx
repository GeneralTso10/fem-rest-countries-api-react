import { Header } from "./Header"
import { Outlet, ScrollRestoration } from "react-router-dom";
import { CountryListContextProvider } from "../context/CountryListContext";
import { ThemeContextProvider } from "../context/ThemeContext";

function App() {
  return (
    <ThemeContextProvider>
      <ScrollRestoration />
      <Header />
      <main>
        <CountryListContextProvider>
          <Outlet />
        </CountryListContextProvider>
      </main>
    </ThemeContextProvider>
  )
}

export default App