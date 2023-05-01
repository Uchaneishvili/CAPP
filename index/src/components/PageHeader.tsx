/** @format */

import React, { FC, Fragment } from 'react';
import { Menu, Layout } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { UserOutlined } from '@ant-design/icons';

import Avatar from 'antd/lib/avatar/avatar';

const PageHeader: FC = () => {
	const rightContent = [
		<Menu
			key='user'
			mode='horizontal'>
			<SubMenu
				title={
					<div style={{ width: '200px' }}>
						<Fragment>
							<span style={{ color: '#999', marginRight: 4 }}>Hi,</span>
							<span>
								{'Giga'} {'Uchaneishvili'}
							</span>
							<Avatar
								shape='square'
								style={{ marginLeft: 8 }}
								size={32}
								icon={<UserOutlined />}
							/>
						</Fragment>
					</div>
				}>
				<Menu.Item key='SignOut'>Sign out</Menu.Item>
			</SubMenu>
		</Menu>,
	];

	return (
		<div>
			<Layout.Header className='header'>
				<div className='rightContainer'>{rightContent}</div>
			</Layout.Header>
		</div>
	);
};
export default PageHeader;
