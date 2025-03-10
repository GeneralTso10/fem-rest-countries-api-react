import { createContext, ReactNode, useContext, useState } from "react";

type CountryListContextValue = {
    regionFilter: string | undefined;
    setRegionFilter: (region: string | undefined) => void;
    countryFilter: string | undefined;
    setCountryFilter: (country: string | undefined) => void;
};

const defaultCtxValue: CountryListContextValue = {
    regionFilter: undefined,
    countryFilter: undefined,
    setRegionFilter: () => undefined,
    setCountryFilter: () => undefined,
};

const CountryListContext = createContext<CountryListContextValue>(defaultCtxValue);

export function CountryListContextProvider({ children }: { children: ReactNode }) {
    const [regionFilter, setRegionFilter] = useState<CountryListContextValue["regionFilter"]>();
    const [countryFilter, setCountryFilter] = useState<CountryListContextValue["countryFilter"]>();

    return (
        <CountryListContext.Provider value={{
            regionFilter,
            setRegionFilter,
            countryFilter,
            setCountryFilter,
        }}>
            {children}
        </CountryListContext.Provider>
    );
}

export function useCountryListContext() {
    return useContext(CountryListContext);
}