/** @format */

import React, { FC, useEffect, useState } from 'react';

import { Layout, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';

import { IEmployee } from '../../types/Employee';
import Bread from '../../components/Bread';
import { getEmployees } from '../../services/EmployeeService';

const EmployeeList: FC = () => {
	const [data, setData] = useState([]);
	const routes = [
		{
			path: '/employees',
			breadcrumbName: 'Employees',
		},
	];

	const getData = async () => {
		const { data } = await getEmployees();
		console.log(data);
		setData(data);
	};

	useEffect(() => {
		getData();
	}, []);

	const columns: ColumnProps<IEmployee[]>[] = [
		{
			title: 'ID',
			dataIndex: 'id',
			width: 250,
		},
		{
			title: 'Name',
			dataIndex: 'name',
			width: 250,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			width: 250,
		},
		{
			title: 'Gender',
			dataIndex: 'gender',
			width: 250,
		},
		{
			title: 'Street',
			dataIndex: ['address', 'street'],
			width: 250,
		},
		{
			title: 'City',
			dataIndex: ['address', 'city'],
			width: 250,
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			width: 250,
		},
		{
			title: 'Action',
			dataIndex: 'id',
			width: 130,
			fixed: 'right',
		},
	];

	return (
		<>
			<Bread routes={routes}></Bread>

			<Layout.Content>
				<Table
					locale={{
						triggerDesc: 'Descend',
						triggerAsc: 'Ascend',
						cancelSort: 'Cancel Sorting',
						filterReset: 'Reset',
					}}
					bordered
					pagination={{ total: 0 }}
					columns={columns}
					dataSource={data}
					rowKey={(record) => record.id}
				/>
			</Layout.Content>
		</>
	);
};

export default EmployeeList;
