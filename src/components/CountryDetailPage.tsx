import { useParams } from "react-router-dom"
import { CountryDetail } from "./CountryDetail";
import { BackButton } from "./BackButton";

export function CountryDetailPage() {
    const { country } = useParams();
    if (!country || country == "")
        throw Error("Invalid country.");

    return (
        <div className="country-detail-page">
            <BackButton />
            <CountryDetail alpha3Code={country} />
        </div>
    );
}