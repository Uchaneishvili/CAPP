/** @format */

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { IEmployee } from './types/employee';
import { IPercentage } from './types/percentage';

const axios = require('axios');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// The URL, which was given by you, is not working. So, I have hosted it on Gist Github.
const URL =
	'https://gist.githubusercontent.com/Uchaneishvili/fec48b15ccb68c08525d713c09449304/raw/7103bcfcbb2f10ed933a0c767e7d9accf40955cc/CAPP_Data';

// Retrieve all data
app.get('/', async (req: Request, res: Response) => {
	try {
		const ffData = fs.readFileSync('./data.json');
		res.send(JSON.parse(ffData));
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

// Retrieve single data by id
app.get('/:id', async (req: Request, res: Response) => {
	try {
		const ffData = fs.readFileSync('./data.json');
		const data = JSON.parse(ffData);
		const id = parseInt(req.params.id);
		const result = data.find((item: IEmployee) => item.id === id);
		if (!result) {
			res.status(404).send('Data not found');
		} else {
			res.json(result);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

// Create new data
app.post('/', async (req: Request, res: Response) => {
	try {
		const ffData = fs.readFileSync('./data.json');
		const data = JSON.parse(ffData);

		const newId = data.length + 1;
		const newData = {
			id: newId,
			...req.body,
		};

		data.push(newData);
		fs.writeFileSync('./data.json', JSON.stringify(data));
		res.json(newData);
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

// POST request to add all data from JSON URL to local file
app.post('/allData', async (req: Request, res: Response) => {
	try {
		const { data } = await axios.get(URL);
		fs.writeFileSync('data.json', JSON.stringify(data));
		res.json({ msg: 'Data added to file' });
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

// Update existing data
app.put('/:id', async (req: Request, res: Response) => {
	try {
		const ffData = fs.readFileSync('./data.json');
		const data = JSON.parse(ffData);
		const id = parseInt(req.params.id);
		const result = data.find((item: { id: number }) => item.id === id);
		if (!result) {
			res.status(404).send('Data not found');
		} else {
			const updatedData = {
				id: id,
				...req.body,
			};
			const index = data.indexOf(result);
			data[index] = updatedData;
			fs.writeFileSync('./data.json', JSON.stringify(data));
			res.json(updatedData);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

// DELETE request to delete a specific item by id
app.delete('/:id', async (req: Request, res: Response) => {
	try {
		const ffData = fs.readFileSync('./data.json');
		const data = JSON.parse(ffData);
		const id = parseInt(req.params.id);
		const item = data.find((item: IEmployee) => item.id === id);
		if (!item) {
			return res.status(404).json({ msg: 'Item not found' });
		}
		const newData = data.filter((item: IEmployee) => item.id !== id);
		fs.writeFileSync('data.json', JSON.stringify(newData));
		res.json({ msg: 'Item deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

// To display a pie chart of employee cities, I have create a method that calculates the percentages of each city according to the data in useEmployeeStore (using Zustand)
app.post('/city-percentages', (req, res) => {
	const data = req.body;

	const cities = data.map(
		(employee: { address: { city: string } }) => employee.address.city
	);
	const cityCounts: Record<string, number> = cities.reduce(
		(acc: any, curr: any) => {
			acc[curr] = (acc[curr] || 0) + 1;
			return acc;
		},
		{}
	);
	const totalEmployees: number = cities.length;
	const cityPercentages: IPercentage[] = [];

	for (const city in cityCounts) {
		const calcPercentage = (cityCounts[city] / totalEmployees) * 100;
		const percentage: number = Math.round(calcPercentage * 100) / 100;
		cityPercentages.push({ type: city, value: percentage });
	}

	res.json(cityPercentages);
});

app.listen(8000, () => {
	console.log('Server started on port 8000');
});
