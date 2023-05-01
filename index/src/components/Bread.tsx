/** @format */

import React, { FC } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';

interface IBreadProp {
	routes: Route[];
}

const { Item } = Breadcrumb;

const Bread: FC<IBreadProp> = (prop) => {
	const extraBreadcrumbItems = prop.routes.map((row: Route, index: number) => {
		const last = prop.routes.length === index + 1;
		return last ? (
			<Item key={row.path}>{row.breadcrumbName}</Item>
		) : (
			<Item key={row.path}>
				<Link to={row.path}>{row.breadcrumbName}</Link>
			</Item>
		);
	});
	const breadcrumbItems = [
		<Item key='home'>
			<Link to='/'>
				<HomeOutlined />
			</Link>
		</Item>,
	].concat(extraBreadcrumbItems);
	return (
		<div className='breadCrumb'>
			<Breadcrumb>{breadcrumbItems}</Breadcrumb>
		</div>
	);
};
export default Bread;
