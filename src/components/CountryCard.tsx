import { Country } from "../types";

export type CountryCardProps = {
    country: Pick<Country, "name" | "region" | "population" | "capital" | "flags" | "alpha3Code">;
};

export function CountryCard({ country }: CountryCardProps) {
    return (
        <article className="country-card-container">
            <img loading="lazy" alt="Country Flag" src={country.flags?.png} />
            <div className="card-detail-container">
                <h3>{country.name}</h3>
                <div className="detail-item-container"><p>Population:</p> {country.population.toLocaleString()}</div>
                <div className="detail-item-container"><p>Region:</p> {country.region}</div>
                <div className="detail-item-container"><p>Capital:</p> {country.capital}</div>
            </div>
        </article>
    );
}