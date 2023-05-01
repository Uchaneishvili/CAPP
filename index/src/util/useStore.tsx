/** @format */

import create from 'zustand';
import { IEmployee } from '../types/Employee';

type EmployeeState = {
	employees: IEmployee[];
	setEmployees: (employees: IEmployee[]) => void;
};

export const useEmployeeStore = create<EmployeeState>((set) => ({
	employees: [],
	setEmployees: (employees: IEmployee[]) => set(() => ({ employees })),
}));
