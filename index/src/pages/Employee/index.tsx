/** @format */

import React, { FC, useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import {
	Button,
	Dropdown,
	Form,
	Input,
	Layout,
	Menu,
	Modal,
	Select,
	Space,
	Table,
	notification,
} from 'antd';
import { ColumnProps } from 'antd/lib/table';

import { IEmployee } from '../../types/Employee';
import Bread from '../../components/Bread';
import {
	deleteEmployee,
	getEmployees,
	updateEmployee,
} from '../../services/EmployeeService';
import { useEmployeeStore } from '../../util/useStore';
const { Option } = Select;

const EmployeeList: FC = () => {
	const { employees, setEmployees, removeEmployee } = useEmployeeStore();
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);

	const menu = (record: IEmployee) => {
		return (
			<Menu
				items={[
					{
						key: 'edit',
						label: (
							<div
								onClick={() => {
									setVisible(true);
									form.setFieldsValue(record);
								}}>
								Edit
							</div>
						),
					},
					{
						key: 'delete',
						label: (
							<span
								onClick={() => {
									if (record.id) {
										deleteEmployee(record.id).then(
											() => {
												removeEmployee(record.id);

												notification.success({
													message: 'Success',
													description: 'The record is deleted',
												});
												getData();
											},
											(e) => {
												console.log('Failed:', e);
											}
										);
									}
								}}>
								Delete
							</span>
						),
					},
				]}
			/>
		);
	};

	const routes = [
		{
			path: '/employees',
			breadcrumbName: 'Employees',
		},
	];
	const getData = () => {
		getEmployees().then((res) => {
			if (res && res.data && res.status === 200) {
				const data = res.data;
				setEmployees(data);
			}
		});
	};

	useEffect(() => {
		getData();
	}, [setEmployees]);

	const editEmployee = async () => {
		try {
			const id = form.getFieldValue('id');
			const val = await form.validateFields();
			console.log(val);

			if (id) {
				const res = await updateEmployee(id, val);
				if (res && res.data && res.status === 200) {
					notification.success({
						message: 'Success',
						description: 'The record is updated',
					});

					setEmployees(res.data);
					form.resetFields();
					setVisible(false);
					getData();
				}
			}
		} catch (e: any) {
			console.log('Failed:', e);
		}
	};
	const columns: ColumnProps<IEmployee>[] = [
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
			render(value, record, index) {
				return (
					<Space>
						<Dropdown
							overlay={menu(record)}
							placement='bottomLeft'>
							<Button
								icon={<DownOutlined />}
								size='small'
							/>
						</Dropdown>
					</Space>
				);
			},
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
					dataSource={employees}
					rowKey={(record) => record['id']}
				/>
			</Layout.Content>

			<Modal
				title={'Update Record: Keep Your Information Current and Accurate'}
				open={visible}
				onOk={editEmployee}
				okText={'Okay'}
				cancelText={'Cancel'}
				onCancel={() => setVisible(false)}>
				<Form
					form={form}
					layout='vertical'>
					<Form.Item
						name='name'
						label='Name'
						rules={[
							{
								required: true,
								message: 'Please fill in all required fields',
							},
						]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='email'
						label='Email'
						rules={[
							{
								required: true,
								message: 'Please fill in all required fields',
							},
						]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='gender'
						label='Gender'
						rules={[
							{
								required: true,
								message: 'Please fill in all required fields',
							},
						]}>
						<Select>
							<Option
								key={0}
								value={'male'}>
								{'Male'}
							</Option>
							<Option
								key={1}
								value={'female'}>
								{'Female'}
							</Option>
						</Select>
					</Form.Item>
					<Form.Item
						name={['address', 'street']}
						label='Street'
						rules={[
							{
								required: true,
								message: 'Please fill in all required fields',
							},
						]}>
						<Input />
					</Form.Item>
					<Form.Item
						name={['address', 'city']}
						label='City'
						rules={[
							{
								required: true,
								message: 'Please fill in all required fields',
							},
						]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='phone'
						label='Phone'
						rules={[
							{
								required: true,
								message: 'Please fill in all required fields',
							},
						]}>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default EmployeeList;
