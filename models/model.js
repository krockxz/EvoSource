const mongoose = require('mongoose');

const commitSchema = new mongoose.Schema({
    hash: String,
    author: String,
    message: String,
    timestamp: { type: Date, default: Date.now },  // Added default value
    parentHash: String,
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
});

const branchSchema = new mongoose.Schema({
    name: String,
    commits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Commit' }]
});

const Commit = mongoose.model('Commit', commitSchema);
const Branch = mongoose.model('Branch', branchSchema);

module.exports = { Commit, Branch };
