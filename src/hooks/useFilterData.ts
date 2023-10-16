import { Data } from "../types";


export const filterData = (data: Data[], query?: string, company?: string, position?: string): Data[] => {
    let filteredData = data;

    if (query) {
        const queryLower = query.toLowerCase();
        filteredData = filteredData.filter(item =>
            item.title.toLowerCase().includes(queryLower)
        );
    }

    if (company) {
        const companies = company.toLowerCase().split(',');
        filteredData = filteredData.filter(item =>
            item.companies.some(c => companies.includes(c.toLowerCase()))
        );
    }

    if (position) {
        const positions = position.toLowerCase().split(',');
        filteredData = filteredData.filter(item =>
            item.positions.some(p => positions.includes(p.toLowerCase().replace('+', ' ')))
        );
    }

    return filteredData;
}