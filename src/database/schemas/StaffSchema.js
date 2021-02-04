const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
	name: String,
	roles:[{name: String, color: String}],
	avatar: String
});

module.exports = mongoose.model('staffs', StaffSchema);