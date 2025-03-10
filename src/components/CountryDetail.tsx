import { useEffect, useMemo, useState } from "react";
import { getCountriesByAlpha3Code } from "../services/CountryService";
import { Country } from "../types";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { countriesQuery } from "./CountryListPage";

type CountryDetailProps = {
    alpha3Code: string;
}

export function CountryDetail({ alpha3Code }: CountryDetailProps) {
    const { data: countries } = useQuery(countriesQuery);
    const countryDetail = useMemo(() => countries?.find(c => c.alpha3Code === alpha3Code), [alpha3Code, countries]);
    const [borderCountries, setBorderCountries] = useState<Country[]>([]);

    useEffect(() => {
        (async () => {
            if (countryDetail?.borders == null || countryDetail.borders.length === 0)
                setBorderCountries([]);
            else {
                const borderCountries = await getCountriesByAlpha3Code(countryDetail.borders, countries ?? []);
                setBorderCountries(borderCountries);
            }
        })();
    }, [countryDetail]);

    if (!countryDetail)
        return null;

    return (
        <div className="country-detail-container">
            <div className="detail-image-container">
                <img alt="Country Flag" src={countryDetail.flags?.png} />
            </div>
            <div className="country-details">
                <h2 className="country-detail-title">{countryDetail.name}</h2>
                <div className="country-details-item-container">
                    <div>
                        <div className="detail-item-container"><p>Native Name:</p> {countryDetail.nativeName}</div>
                        <div className="detail-item-container"><p>Population:</p> {countryDetail.population.toLocaleString()}</div>
                        <div className="detail-item-container"><p>Region:</p> {countryDetail.region}</div>
                        <div className="detail-item-container"><p>Sub Region:</p> {countryDetail.subregion}</div>
                        <div className="detail-item-container"><p>Capital:</p> {countryDetail.capital}</div>
                    </div>
                    <div>
                        <div className="detail-item-container"><p>Top Level Domain:</p> {countryDetail.topLevelDomain?.join(", ")}</div>
                        <div className="detail-item-container"><p>Currencies:</p> {countryDetail.currencies?.map(c => c.name).join(", ")}</div>
                        <div className="detail-item-container"><p>Languages:</p> {countryDetail.languages?.map(l => l.name).join(", ")}</div>
                    </div>
                </div>
                <div className="detail-item-container border-countries-container"><p>Border Countries:</p>
                    {borderCountries?.map(c => <Link key={c.alpha3Code} to={`/${c.alpha3Code}`} className="btn-border-country">{c.name}</Link>)}
                </div>
            </div>
        </div>
    );
}