import { SetSelectedCompanyFunction, SetSelectedPositionFunction, SetQueryStringFunction } from "../types";

export  const updateParams =  ( 
    setSelectedCompany: SetSelectedCompanyFunction,
    setSelectedPosition: SetSelectedPositionFunction,
    setQueryString: SetQueryStringFunction,
    name: string,
    value: string) => {
    const url = new URL(window.location.href);
    if ((url.searchParams.has(name) && url.searchParams.get(name) === value) || value === '') {
        url.searchParams.delete(name);
        if (name === 'co' && setSelectedCompany !== null) setSelectedCompany(null);
        if (name === 'pos'&& setSelectedPosition !== null) setSelectedPosition(null);
    } else {
        url.searchParams.set(name, value);
        if (name === 'co' && setSelectedCompany !== null) setSelectedCompany(value);
        if (name === 'pos' && setSelectedPosition !== null) setSelectedPosition(value);
    }
    window.history.pushState({}, '', url.toString());
    setQueryString(window.location.search)
}