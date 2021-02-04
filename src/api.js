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
const cors = require('cors');
app.use('/.netlify/functions/api', route);


mongoose.connect(process.env.MONGO_URI, {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

const corsOptions = 
{
	origin: "https://pokefinium.netlify.app",
	allowedHeaders: ['Origin', 'X-Requested-with', 'Content-Type', 'Accept', 'Access-Control-Allow-Origin'],
};
//Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin
app.use(cors(corsOptions));
route.get('/', cors(corsOptions), (req, res) =>
{
	res.send("Endpoints are:\n/staff\n/draft\n/draft/:season\n/draft/:season/:id");
});


route.get('/staff',cors(corsOptions), (req, res) =>
{
	StaffSchema.find({}, (error, staff) =>
	{
		if(error) return res.status(500).send({msg: "Something happened to the database."});
		return res.json(staff);
	});
});

route.get('/draft', cors(corsOptions), (req, res) =>
{
	DraftSchema.find({}, (error, drafts) =>
	{
		if(error) return res.status(500).send({msg: "Something happend to the database."});
		return res.json(drafts);
	});
})

route.get('/draft/:season', cors(corsOptions), (req, res) =>
{
	DraftSchema.find({season: req.params.season}, (error, drafts) =>
	{
		if(error) return res.status(404).send({msg: "Couldn't find any drafts under that."});
		return res.json(drafts);
	});
});

route.get('/draft/:season/:id', cors(corsOptions), (req, res) =>
{
	DraftSchema.findOne({season: req.params.season, searchId: req.params.id}, (error, draft) =>
	{
		if(error) return res.status(404).send({msg: "Couldn't find a draft under that query. Please check that you have the correct season, and search id."});
		return res.json(draft);
	})
});

module.exports = app;
module.exports.handler = serverless(app);