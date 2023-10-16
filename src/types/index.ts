export interface Data {
    title: string;
    tags: string[];
    companies: string[];
    positions: string[];
  }
  
export  interface FilterButtonsProps {
    uniqueItems: string[];
    selectedItem: string | null;
    onSelect: (item: string) => void;
}


export type SetSelectedCompanyFunction = ((value: string | null) => void) | null;
export type SetSelectedPositionFunction = ((value: string | null) => void) | null;
export type SetQueryStringFunction = (value: string) => void;