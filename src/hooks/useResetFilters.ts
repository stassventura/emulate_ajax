import { SetSelectedCompanyFunction, SetSelectedPositionFunction, SetQueryStringFunction } from "../types";

export const resetFilters = ( 
    setSelectedCompany: SetSelectedCompanyFunction,
    setSelectedPosition: SetSelectedPositionFunction,
    setQueryString: SetQueryStringFunction) =>{
    const url = new URL(window.location.href);
    
    // Clear all request parameters
    url.searchParams.delete('q');
    url.searchParams.delete('co');
    url.searchParams.delete('pos');
    setSelectedCompany !== null ? setSelectedCompany(null) : null;

    setSelectedPosition !== null ? setSelectedPosition(null) : null;
    
    // Update browser history and address bar
    window.history.pushState({}, '', url.toString());
    
    setQueryString(window.location.search);
    
  }