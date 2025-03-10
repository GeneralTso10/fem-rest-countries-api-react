import { QueryClient } from "@tanstack/react-query";
import { countriesQuery } from "../components/CountryListPage";

export function countriesLoader(queryClient: QueryClient) {
    return async () => {
        queryClient.ensureQueryData(countriesQuery);
        return null;
    };
}