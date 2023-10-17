export interface Data {
  title: string;
  tags: string[];
  companies: string[];
  positions: string[];
}

export interface FilterButtonsProps {
  uniqueItems: string[];
  selectedItem: string | null;
  onSelect: (item: string) => void;
}
