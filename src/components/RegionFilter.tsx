import { ChangeEvent } from "react";

const allRegions = ["Africa", "Americas", "Antarctic", "Asia", "Europe", "Polar", "Oceania"];

export type RegionFilterProps = {
    onChange: (region: string) => void;
    selectedRegion?: string;
};

export function RegionFilter({ onChange, selectedRegion }: RegionFilterProps) {

    function handleRegionChanged(e: ChangeEvent<HTMLSelectElement>) {
        onChange?.(e.currentTarget.value);
    }

    return (
        <select className="region-filter" aria-label="Filter by Region" onChange={handleRegionChanged} defaultValue={selectedRegion}>
            <option value="">Filter by Region</option>
            {allRegions.map(region => {
                return (<option key={region}>{region}</option>)
            })}
        </select>
    );
}