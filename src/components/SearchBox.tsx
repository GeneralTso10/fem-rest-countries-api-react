import React, { useCallback } from "react";
import MagnifyingGlass from "../assets/magnifying-glass-icon.svg?react";

export type SearchBoxProps = {
    onSearchChanged: (searchText: string) => void;
    searchText?: string;
    containerClassName?: string;
}

function debounce(fn: Function, delay: number) {
    let timer: ReturnType<typeof window.setTimeout>;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(fn, delay, ...args);
    }
}

export function SearchBox({ containerClassName, onSearchChanged, searchText }: SearchBoxProps) {

    const debouncedSearchChanged = useCallback(debounce(onSearchChanged, 400), [onSearchChanged]);

    function handleSearchChanged(e: React.ChangeEvent<HTMLInputElement>) {
        debouncedSearchChanged(e.target.value);
    }

    return (
        <div className={`input-container ${containerClassName}`}>
            <MagnifyingGlass />
            <input type="search" placeholder="Search for a country..." onChange={handleSearchChanged} defaultValue={searchText} />
        </div>
    );
}