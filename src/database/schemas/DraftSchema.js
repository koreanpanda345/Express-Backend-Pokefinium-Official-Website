const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DraftSchema = new Schema({
	name: String,
	draftDoc: String,
	season: String,
	isCurrent: Boolean,
	searchId: String,
	liaisons: [{name: String, color: String}]
});

module.exports = mongoose.model("drafts", DraftSchema);