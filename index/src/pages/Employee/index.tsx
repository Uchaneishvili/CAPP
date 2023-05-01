/** @format */

import React, { FC } from 'react';

import { Layout, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';

import { IEmployee } from '../../types/Employee';
import Bread from '../../components/Bread';

const EmployeeList: FC = () => {
	const routes = [
		{
			path: '/employees',
			breadcrumbName: 'Employees',
		},
	];

	const columns: ColumnProps<IEmployee[]>[] = [
		{
			title: 'ID',
			dataIndex: 'id',
			render: (val) => (val ? 'yes' : 'no'),
			width: 250,
			filters: [
				{ text: 'no', value: '0' },
				{ text: 'yes', value: '1' },
			],
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
			dataIndex: 'address.street',
			width: 250,
		},
		{
			title: 'City',
			dataIndex: 'address.city',
			width: 250,
		},
		{
			title: 'Phone',
			dataIndex: 'Phone',
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
					dataSource={[]}
					// rowKey={(record) => record.id}
				/>
			</Layout.Content>
		</>
	);
};

export default EmployeeList;
