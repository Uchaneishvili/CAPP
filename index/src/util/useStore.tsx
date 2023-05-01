/** @format */

import { create } from 'zustand';
import { IEmployee } from '../types/Employee';

type EmployeeState = {
	employees: IEmployee[];
	setEmployees: (employees: IEmployee[]) => void;
	removeEmployee: (id: number) => void;
	addEmployee: (employee: IEmployee) => void;
	updateEmployeeStore: (employee: IEmployee) => void;
};

export const useEmployeeStore = create<EmployeeState>((set) => ({
	employees: [],
	addEmployee: (employee: IEmployee) =>
		set((state) => ({ employees: [...state.employees, employee] })),
	setEmployees: (employees: IEmployee[]) => set(() => ({ employees })),
	removeEmployee: (id) =>
		set((state) => ({
			employees: state.employees.filter((employee) => employee.id !== id),
		})),
	updateEmployeeStore: (updatedEmployee: IEmployee) =>
		set((state) => ({
			employees: state.employees.map((employee) =>
				employee.id === updatedEmployee.id ? updatedEmployee : employee
			),
		})),
}));
