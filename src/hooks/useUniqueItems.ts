import { useEffect, useState } from 'react';
import { Data } from '../types';

export const useUniqueItems = (data: Data[]) => {
  const [uniqueCompanies, setUniqueCompanies] = useState<string[]>([]);
  const [uniquePositions, setUniquePositions] = useState<string[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      const uniqueCompanies = Array.from(new Set(data.flatMap((item) => item.companies)));
      const uniquePositions = Array.from(new Set(data.flatMap((item) => item.positions)));

      setUniqueCompanies(uniqueCompanies);
      setUniquePositions(uniquePositions);
    }
  }, [data]);

  return {
    uniqueCompanies,
    uniquePositions,
  };
};
