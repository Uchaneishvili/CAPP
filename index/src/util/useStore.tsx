/** @format */

import { create } from 'zustand';
import { IEmployee } from '../types/Employee';

type EmployeeState = {
	employees: IEmployee[];
	setEmployees: (employees: IEmployee[]) => void;
	removeEmployee: (id: number) => void;
	addEmployee: (employee: IEmployee) => void;
	updateEmployeeStore: (id: number, updatedEmployee: IEmployee) => void;
};

export const useEmployeeStore = create<EmployeeState>((set) => ({
	employees: [],
	addEmployee: (employee: IEmployee) =>
		set((state) => ({ employees: [...state.employees, employee] })),

	setEmployees: (employees: IEmployee[]) => set(() => ({ employees })),
	removeEmployee: (id) => {
		set((state) => ({
			employees: state.employees.filter((employee) => employee.id !== id),
		}));
	},
	updateEmployeeStore: (id: number, updatedEmployee: IEmployee) => {
		set((state) => ({
			employees: state.employees.map((employee) => {
				if (employee.id === id) {
					return {
						...employee,
						...updatedEmployee,
					};
				}
				return employee;
			}),
		}));
	},
}));
