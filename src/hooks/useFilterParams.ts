import { useState, useEffect } from 'react';

export const useFilterParams = () => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [queryString, setQueryString] = useState(window.location.search);

  const url = new URL(window.location.href);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const companies = urlParams.getAll('co');
    const positions = urlParams.getAll('pos');

    if (companies) {
      setSelectedCompanies(companies);
    }
    if (positions) {
      setSelectedPositions(positions);
    }
  }, []);

  const reset = () => {
    url.searchParams.delete('q');
    url.searchParams.delete('co');
    url.searchParams.delete('pos');
    setSelectedPositions([]);
    setSelectedCompanies([]);

    window.history.pushState({}, '', url.toString());
    setQueryString(window.location.search);
  };

  const updateParams = (name: string, value: string) => {
    const url = new URL(window.location.href);
    if (name === 'co') {
      const existingCompanies = new Set(url.searchParams.getAll(name));
      if (existingCompanies.has(value)) {
        existingCompanies.delete(value);
        url.searchParams.delete(name);
        for (const company of existingCompanies) {
          url.searchParams.append(name, company);
        }
      } else {
        existingCompanies.add(value);
        url.searchParams.append(name, value);
      }
      setSelectedCompanies(Array.from(existingCompanies));
    } else if (name === 'pos') {
      const existingPositions = new Set(url.searchParams.getAll(name));
      if (existingPositions.has(value)) {
        existingPositions.delete(value);
        url.searchParams.delete(name);
        for (const company of existingPositions) {
          url.searchParams.append(name, company);
        }
      } else {
        existingPositions.add(value);
        url.searchParams.append(name, value);
      }
      setSelectedPositions(Array.from(existingPositions));
    } else {
      if (url.searchParams.has(name) && (url.searchParams.get(name) === value || value === '')) {
        url.searchParams.delete(name);
      } else {
        url.searchParams.set(name, value);
      }
    }
    window.history.pushState({}, '', url.toString());
    setQueryString(window.location.search);
  };

  return {
    reset,
    queryString,
    selectedCompanies,
    selectedPositions,
    updateParams,
  };
};
