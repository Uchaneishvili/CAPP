/** @format */

import axios from 'axios';
import { IEmployee } from '../types/Employee';

export const calculatePercentagesOfCities = async (data: IEmployee[]) => {
	return await axios.post(`http://localhost:8000/city-percentages`, data);
};
