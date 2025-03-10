import { Country } from "../types";

export async function getCountries(signal: AbortSignal): Promise<Country[]> {
    const resp = await fetch("./data.json", { signal });
    if (!resp.ok)
        throw resp;

    return await resp.json();
}

export async function getCountry(alpha3Code: string, countries: Country[]): Promise<Country | undefined> {
    const data: Country[] = await getCountriesByAlpha3Code([alpha3Code], countries);
    return data.length > 0 ? data[0] : undefined;
}

export async function getCountriesByAlpha3Code(alpha3Code: string[], countries: Country[]): Promise<Country[]> {
    return countries.filter(c => alpha3Code.includes(c.alpha3Code));
}