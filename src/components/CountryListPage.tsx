import { CountryCard } from "./CountryCard";
import { SearchBox } from "./SearchBox";
import { RegionFilter } from "./RegionFilter";
import { useCountryListContext } from "../context/CountryListContext";
import { Link } from "react-router-dom";
import { Loader } from "./Loader";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../services/CountryService";

export const countriesQuery = {
    queryKey: ["countries"],
    queryFn: ({ signal }: { signal: AbortSignal }) => getCountries(signal),
    staleTime: 100 * 60 * 60 * 24,
}

export function CountryListPage() {
    const { data: countries, isPending } = useQuery(countriesQuery);
    const { regionFilter, setRegionFilter, countryFilter, setCountryFilter } = useCountryListContext();

    function handleSearchChanged(searchText: string) {
        setCountryFilter(searchText);
    }

    if (isPending)
        return <Loader />;

    return (
        <div className="country-list-page">
            <div className="country-list-header">
                <SearchBox onSearchChanged={handleSearchChanged} containerClassName="country-input-filter" searchText={countryFilter} />
                <RegionFilter onChange={setRegionFilter} selectedRegion={regionFilter} />
            </div>
            <div className="country-list-container">
                {
                    (countries ?? []).map(country => {
                        if (countryFilter != null && countryFilter != "") {
                            if (country.name.toLocaleUpperCase().indexOf(countryFilter.toLocaleUpperCase()) < 0)
                                return null;
                        }

                        if (regionFilter != null && regionFilter != "" && country.region.localeCompare(regionFilter, undefined, { sensitivity: "case" }) !== 0)
                            return null;
                        return (
                            <Link key={country.alpha3Code} to={`/${country.alpha3Code}`}>
                                <CountryCard country={country} />
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    );
}