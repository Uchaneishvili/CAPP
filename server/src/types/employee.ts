/** @format */

export interface IEmployee {
	id: number;
	name: string;
	email: string;
	gender: string;
	address: {
		street: string;
		city: string;
	};
	phone: string;
}

export interface IEmployeeQuery {
	name: string;
}
