require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const path = require('path');
const route = express.Router();
const mongoose = require('mongoose');
const StaffSchema = require('./database/schemas/StaffSchema');
const DraftSchema = require('./database/schemas/DraftSchema');

app.use('/.netlify/functions/api', route);


mongoose.connect(process.env.MONGO_URI, {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

route.get('/draft/:season/:id', async (req, res) =>
{
	const draft = await DraftSchema.findOne({season: req.params.season, searchId: req.params.id});
	if(!draft) return res.status(404).send({msg: 'Draft was not found. Please check that you have the correct search id, and season.'});
	return res.send(draft);
});

route.get('/draft/:season', async (req, res) => {
	const drafts = await DraftSchema.find({season: req.params.season});
	if(!drafts) return res.status(404).send({msg: "Couldn't find any drafts for this season."});
	return res.send(drafts);
});

route.get('/draft', async (req, res) =>
{
	const drafts = await DraftSchema.find();
	if(!drafts) return res.status(500).send({msg: "Something happend to the database"});
	return res.send(drafts);
});


route.get('/staff', async (req, res) =>
{
	const staff = await StaffSchema.find();
	console.log(staff);
	if(!staff) return res.status(500).send({msg: 'Something happened to the database'});
	return res.send(staff);
});

app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../indexl.html')))
module.exports = app;
module.exports.handler = serverless(app);