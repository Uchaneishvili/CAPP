/** @format */

import React from 'react';
import './App.css';
import EmployeeList from './pages/Employee';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PageHeader from './components/PageHeader';
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
								Employee List
							</Menu.Item>
						</Menu>
					</Sider>

					<Layout
						className='site-layout'
						style={{ marginLeft: 200 }}>
						<PageHeader />
						<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
							<EmployeeList />
						</Content>
						<Footer style={{ textAlign: 'center' }}></Footer>
					</Layout>
				</Layout>
			</div>
		</>
	);
}

export default App;
