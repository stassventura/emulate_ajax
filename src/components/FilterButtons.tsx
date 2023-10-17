import { FC } from 'react';

export interface FilterButtonsProps {
  uniqueItems: string[];
  selectedItems: string[];
  onSelect: (item: string) => void;
}

const FilterButtons: FC<FilterButtonsProps> = ({ uniqueItems, selectedItems, onSelect }) => {
  return (
    <div className="flex gap-2">
      {uniqueItems.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelect(item)}
          className={`bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition ${
            selectedItems.includes(item) ? 'bg-gray-400' : ''
          }`}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
