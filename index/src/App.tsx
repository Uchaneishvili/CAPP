/** @format */

import React from 'react';
import './App.css';
import EmployeeList from './pages/Employee';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PageHeader from './components/PageHeader';
import Statistics from './pages/Statistics';
import { Link, Route, Routes } from 'react-router-dom';

function App() {
	const { Content, Footer, Sider } = Layout;

	return (
		<>
			<div>
				<Layout>
					<Sider
						style={{
							overflow: 'auto',
							height: '100vh',
							position: 'fixed',
							left: 0,
						}}>
						<div className='logo'>Call App</div>
						<Menu
							theme='dark'
							mode='inline'
							defaultSelectedKeys={['1']}>
							<Menu.Item
								key='1'
								icon={<UserOutlined />}>
								<Link to='/'>Employee List</Link>
							</Menu.Item>
							<Menu.Item
								key='2'
								icon={<UserOutlined />}>
								<Link to='/statistics'>Statistics</Link>
							</Menu.Item>
						</Menu>
					</Sider>

					<Layout
						className='site-layout'
						style={{ marginLeft: 200 }}>
						<PageHeader />
						<Routes>
							<Route
								path='/'
								element={
									<Content
										style={{ margin: '24px 16px 0', overflow: 'initial' }}>
										<EmployeeList />
									</Content>
								}
							/>
							<Route
								path='/statistics'
								element={
									<Content
										style={{ margin: '24px 16px 0', overflow: 'initial' }}>
										<Statistics />
									</Content>
								}
							/>
						</Routes>
						<Footer style={{ textAlign: 'center' }}></Footer>
					</Layout>
				</Layout>
			</div>
		</>
	);
}

export default App;
