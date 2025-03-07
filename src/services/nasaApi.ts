import { APODDataI } from '../shared/apod.interface';
import { NASA_API_KEY, BASE_URL } from '../config/config';

export const fetchAPOD = async (date?: string): Promise<APODDataI> => {
  const url = date
    ? `${BASE_URL}?api_key=${NASA_API_KEY}&date=${date}`
    : `${BASE_URL}?api_key=${NASA_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error while fetching data from NASA API');
  }
  return response.json();
};