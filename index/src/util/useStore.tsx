/** @format */

import { create } from 'zustand';
import { IEmployee } from '../types/Employee';

type EmployeeState = {
	employees: IEmployee[];
	setEmployees: (employees: IEmployee[]) => void;
	removeEmployee: (id: number) => void;
	addEmployee: (employee: IEmployee) => void;
};

export const useEmployeeStore = create<EmployeeState>((set) => ({
	employees: [],
	setEmployees: (employees: IEmployee[]) => set(() => ({ employees })),
	removeEmployee: (id) => {
		set((state) => ({
			employees: state.employees.filter((employee) => employee.id !== id),
		}));
	},
	addEmployee: (employee: IEmployee) =>
		set((state) => ({ employees: [...state.employees, employee] })),
}));
