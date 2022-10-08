import { type } from "@testing-library/user-event/dist/type";
import { createContext, useContext } from "react";

export interface Search {
    busca: string;
}

export type SearchType = {
    busca: string;
    setBusca: (busca: string) => void
}

export const SearchContext = createContext<SearchType>({busca: '', setBusca: busca => console.log(busca)})

export const useSearch = () => useContext(SearchContext)