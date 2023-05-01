/** @format */
import axios from 'axios';

export const getEmployees = async () => {
	return await axios.get(`http://localhost:8000`);
};

// export const saveRole = async (data: any) => {
// 	return await RequestHelper.cas.post('/roles', data);
// };

// export const deleteRole = async (id: string) => {
// 	return await RequestHelper.cas.delete(`/roles/${id}`);
// };
