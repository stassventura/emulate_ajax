import FilterButtons from './components/FilterButtons';
import { useData } from './hooks/useData';
import { useFilterParams } from './hooks/useFilterParams';
import { useUniqueItems } from './hooks/useUniqueItems';
import { filterData } from './helpers/filterData';
import { useMemo } from 'react';

import './App.css';

function App() {
  const { data, isLoading } = useData();
  const { updateParams, selectedCompanies, selectedPositions, reset, queryString } =
    useFilterParams();
  const { uniqueCompanies, uniquePositions } = useUniqueItems(data);
  const filteredData = useMemo(() => filterData(data, queryString), [data, queryString]);

  return (
    <>
      <div className="bg-gray p-8 rounded-lg shadow-md m-4">
        <div className="flex flex-col space-y-4">
          <button
            onClick={reset}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
            disabled={isLoading}>
            Reset
          </button>

          <input
            type="text"
            onChange={(e) => updateParams('q', e.target.value)}
            placeholder="Search..."
            className="py-2 px-4 border rounded-lg"
            disabled={isLoading}
          />

          <FilterButtons
            uniqueItems={uniqueCompanies}
            selectedItems={selectedCompanies}
            onSelect={(company) => updateParams('co', company)}
          />

          <FilterButtons
            uniqueItems={uniquePositions}
            selectedItems={selectedPositions}
            onSelect={(position) => updateParams('pos', position)}
          />
        </div>

        <div className="mt-8">
          {isLoading && (
            <div className="flex justify-center">
              <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
              </svg>
            </div>
          )}
          {!isLoading && filteredData.length === 0 && (
            <div className="text-gray-700 text-center">No questions found.</div>
          )}
          {!isLoading &&
            filteredData.length > 0 &&
            filteredData.map((item, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-gray-700">{item.title}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
