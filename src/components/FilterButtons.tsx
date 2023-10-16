import { FilterButtonsProps } from '../types';


const FilterButtons: React.FC<FilterButtonsProps> = ({ uniqueItems, selectedItem, onSelect }) => {
    return (
      <div className="flex space-x-2">
        {uniqueItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelect(item)}
            className={`bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition ${selectedItem === item ? 'bg-gray-400' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>
    );
  };
  
  export default FilterButtons;