import { Data } from '../types';

export const filterData = (data: Data[], queryString: string): Data[] => {
  const urlParams = new URLSearchParams(queryString);

  const query = urlParams.get('q')?.replace('+', ' ');
  const company = urlParams.get('co')?.replace('+', ' ');
  const position = urlParams.get('pos')?.replace('+', ' ');

  let filteredData = data;

  if (query) {
    const queryLower = query.toLowerCase();
    filteredData = filteredData.filter((item) => item.title.toLowerCase().includes(queryLower));
  }

  if (company) {
    const companies = company.toLowerCase().split(',');
    filteredData = filteredData.filter((item) =>
      item.companies.some((c) => companies.includes(c.toLowerCase())),
    );
  }

  if (position) {
    const positions = position.toLowerCase().split(',');
    filteredData = filteredData.filter((item) =>
      item.positions.some((p) => positions.includes(p.toLowerCase().replace('+', ' '))),
    );
  }

  return filteredData;
};
