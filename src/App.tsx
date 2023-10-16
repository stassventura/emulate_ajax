import { useState, useEffect } from 'react'
import database from './database.json'
import { Data } from './types';
import './App.css'
import FilterButtons from './components/FilterButtons';
import { filterData } from './hooks/useFilterData';
import { resetFilters } from './hooks/useResetFilters';
import { updateParams } from './hooks/useUpdateParams';

function App() {
  const [data, setData] = useState<Data[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)
  const [uniqueCompanies, setUniqueCompanies] = useState<string[]>([])
  const [uniquePositions, setUniquePositions] = useState<string[]>([])
  const [queryString, setQueryString] = useState(window.location.search)
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const fetchData = (): Promise<Data[]> => {
    return new Promise(resolve => {
        resolve(database);
    })
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(queryString);

    const query = urlParams.get('q')?.replace('+', ' ');
    const company = urlParams.get('co')?.replace('+', ' ');
    const position = urlParams.get('pos')?.replace('+', ' ');

    fetchData().then((res) => {
        if (res.length > 0) {
            const filteredData = filterData(res, query, company, position);
            setData(filteredData);
            if (filteredData.length === 0) {
                setIsEmpty(true);
            } else {
                setIsEmpty(false);
            }
            setIsLoading(false);
        } else {
            setIsLoading(false);
            setIsEmpty(true);
        }
    });

}, [queryString]);

useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const company = urlParams.get('co');
  const position = urlParams.get('pos');

  if (company) {
      setSelectedCompany(company.replace('+', ' '));
  }

  if (position) {
      setSelectedPosition(position.replace('+', ' '));
  }
}, []);


  useEffect(() => {
   if(data.length > 0){
    const uniqueCompanies = Array.from(new Set(data.flatMap(item => item.companies)));
    const uniquePositions = Array.from(new Set(data.flatMap(item => item.positions)));
    
    setUniqueCompanies(uniqueCompanies)
    setUniquePositions(uniquePositions)
   }
  }, [data])
  
  const handleResetFilters = () => {
    resetFilters(setSelectedCompany, setSelectedPosition, setQueryString);
  };
  const handleUpdateParams = (name: string, value: string) => {

    updateParams(setSelectedCompany, setSelectedPosition, setQueryString, name, value);
  };

  return (
    <>
        <div className="bg-gray p-8 rounded-lg shadow-md m-4">
            <div className="flex flex-col space-y-4">
                <button 
                    onClick={handleResetFilters} 
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                    disabled={isLoading}
                >
                    Reset
                </button>

                <input 
                    type="text" 
                    onChange={(e)=>handleUpdateParams('q', e.target.value)} 
                    placeholder="Search..." 
                    className="py-2 px-4 border rounded-lg"
                    disabled={isLoading}
                />

                <FilterButtons
                  uniqueItems={uniqueCompanies}
                  selectedItem={selectedCompany}
                  onSelect={(company) => handleUpdateParams('co', company)}
                />

                <FilterButtons
                  uniqueItems={uniquePositions}
                  selectedItem={selectedPosition}
                  onSelect={(position) => handleUpdateParams('pos', position)}
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
                {isEmpty && (
                    <div className="text-gray-700 text-center">
                        No questions found.
                    </div>
                )}
                {data.length > 0 && data.map((item, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                        <p className="text-gray-700">{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    </>
)

}

export default App
