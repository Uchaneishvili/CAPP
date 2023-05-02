/** @format */

import React, { FC, useCallback, useEffect, useState } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
	Button,
	Col,
	Form,
	Input,
	Layout,
	Modal,
	Row,
	Select,
	Table,
	notification,
} from 'antd';
import { ColumnProps } from 'antd/lib/table';

import { IEmployee } from '../../types/Employee';
import Bread from '../../components/Bread';
import {
	createEmployee,
	deleteEmployee,
	getEmployees,
	updateEmployee,
} from '../../services/EmployeeService';
import { useEmployeeStore } from '../../util/useStore';
const { Option } = Select;

const EmployeeList: FC = () => {
	const {
		employees,
		setEmployees,
		removeEmployee,
		addEmployee,
		updateEmployeeStore,
	} = useEmployeeStore();
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [update, setUpdate] = useState(false);
	const routes = [
		{
			path: '/employees',
			breadcrumbName: 'Employees',
		},
	];

	const getData = useCallback(async () => {
		await getEmployees().then((res) => {
			if (res && res.data && res.status === 200) {
				const data = res.data;
				setEmployees(data);
			}
		});
	}, [setEmployees]);

	useEffect(() => {
		getData();
	}, [getData]);

	const saveAndUpdateEmployee = async () => {
		try {
			const id = form.getFieldValue('id');
			const val = await form.validateFields();

			if (id) {
				const res = await updateEmployee(id, val);
				if (res && res.data && res.status === 200) {
					notification.success({
						message: 'Success',
						description: 'The record is updated',
					});

					form.resetFields();
					setVisible(false);
					getData();
					updateEmployeeStore(id, res.data);
				}
			} else {
				const res = await createEmployee(val);
				if (res && res.data && res.status === 200) {
					notification.success({
						message: 'Success',
						description: 'The record is created',
					});

					form.resetFields();
					setVisible(false);
					getData();
					addEmployee(res.data);
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
					<Button
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
						<DeleteOutlined />
					</Button>
				);
			},
		},
	];

	return (
		<>
			<Bread routes={routes}></Bread>

			<Layout.Content>
				<Row
					gutter={24}
					style={{ paddingBottom: '10px' }}>
					<Col flex='auto'></Col>
					<Col flex='100px'>
						<Button
							type='primary'
							icon={<PlusOutlined />}
							onClick={() => {
								setVisible(true);
							}}>
							{'add'}
						</Button>
					</Col>
				</Row>
				<Table
					bordered
					pagination={{ total: 0 }}
					columns={columns}
					dataSource={employees}
					rowKey={(record) => record['id']}
					onRow={(record) => {
						return {
							onDoubleClick: () => {
								setUpdate(true);
								setVisible(true);
								form.setFieldsValue(record);
							},
						};
					}}
				/>
			</Layout.Content>

			<Modal
				style={{ textAlign: 'center' }}
				title={
					update
						? 'Edit Record: Make Changes to Your Information'
						: 'Create New Record: Add Your Data with Ease'
				}
				open={visible}
				onOk={saveAndUpdateEmployee}
				okText={'Okay'}
				cancelText={'Cancel'}
				onCancel={() => setVisible(false)}>
				<Form
					style={{ textAlign: 'initial' }}
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
