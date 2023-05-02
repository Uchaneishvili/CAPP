/** @format */

import React, { useState, useEffect, FC, useCallback } from 'react';
import { Pie } from '@ant-design/plots';
import { useEmployeeStore } from '../../util/useStore';
import { calculatePercentagesOfCities } from '../../services/StatisticsService';
import { Card, Layout } from 'antd';

const Statistics: FC = () => {
	const { employees } = useEmployeeStore();
	const [data, setData] = useState([{}]);

	const getData = useCallback(async () => {
		await calculatePercentagesOfCities(employees).then((res) => {
			if (res && res.data && res.status === 200) {
				const data = res.data;
				setData(data);
			}
		});
	}, [employees]);

	useEffect(() => {
		getData();
	}, [getData]);

	const config = {
		appendPadding: 10,
		data,
		angleField: 'value',
		colorField: 'type',
		radius: 0.75,
		label: {
			type: 'spider',
			labelHeight: 28,
			content: '{name}\n{percentage}',
		},
		interactions: [
			{
				type: 'element-selected',
			},
			{
				type: 'element-active',
			},
		],
	};

	return (
		<>
			<Layout.Content style={{ alignItems: 'center' }}>
				<Card title='Employees by City: A Visual Representation'>
					<Pie {...config} />
				</Card>
			</Layout.Content>
		</>
	);
};

export default Statistics;
