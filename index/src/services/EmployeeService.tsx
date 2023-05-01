/** @format */
import axios from 'axios';
import { IEmployee } from '../types/Employee';

export const getEmployees = async () => {
	return await axios.get(`http://localhost:8000`);
};

export const deleteEmployee = async (id: number) => {
	return await axios.delete(`http://localhost:8000/${id}`);
};

export const createEmployee = async (data: IEmployee) => {
	return await axios.post(`http://localhost:8000/`, data);
};

export const updateEmployee = async (id: number, data: IEmployee) => {
	return await axios.put(`http://localhost:8000/${id}`, data);
};
