require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const path = require('path');
const route = express.Router();
const mongoose = require('mongoose');
const StaffSchema = require('./database/schemas/StaffSchema');
const DraftSchema = require('./database/schemas/DraftSchema');
const { schema } = require('./database/schemas/StaffSchema');

app.use('/.netlify/functions/api', route);


mongoose.connect(process.env.MONGO_URI, {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

route.get('/', (req, res) =>
{
	const staff = StaffSchema.find().then(({data}) =>
		{
			return data;
		}).catch((error) => console.error(error));
		res.json(staff);
});

route.get('/staff', (req, res) =>
{
	const staff = StaffSchema.find().then(({data}) =>
	{
		console.log(data);
		return data;
	}).catch((error) => console.error(error));
	return res.send(staff);
});

module.exports = app;
module.exports.handler = serverless(app);