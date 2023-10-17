import { Data } from '../types';
import database from '../database.json';

export const DataService = {
  getData: (): Promise<Data[]> => {
    return new Promise((resolve) => {
      resolve(database);
    });
  },
};
