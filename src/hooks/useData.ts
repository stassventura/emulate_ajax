import { useState, useEffect, useCallback } from 'react';
import { DataService } from '../api/DataService';
import { Data } from '../types';

export const useData = () => {
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await DataService.getData();
      if (response.length > 0) {
        setData(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, isLoading };
};
