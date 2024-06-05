const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const gitOperations = require('../utils/gitFunctions');
const { Commit, Branch } = require('../models/model');

app.use(express.json());

// Creating a router
const router = express.Router();

// Initializing git directory
router.post('/init', (req, res) => {
    try {
        const result = gitOperations.createGitDirectory();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Getting the object by hash
router.get('/objects/:hash', async (req, res) => {
    try {
        const result = await gitOperations.catFile(req.params.hash);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Creating a blob
router.post('/create-blob', (req, res) => {
    if (!req.body.filePath) {
        return res.status(400).send({ message: 'File path is required' });
    }

    try {
        const hash = gitOperations.createBlob(req.body.filePath);
        const url = `http://${req.hostname}:${port}/objects/${hash}`;
        res.send({ hash: hash, url: url, message: 'Blob created successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Creating a commit
router.post('/create-commit', (req, res) => {
    const { message, author, parentHash } = req.body;
    try {
        const result = gitOperations.createCommit(message, author, parentHash);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Creating a branch
router.post('/create-branch', (req, res) => {
    const { name, commitHash } = req.body;
    try {
        const result = gitOperations.createBranch(name, commitHash);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Getting commit history
router.get('/history/:commitHash', async (req, res) => {
    try {
        const history = await gitOperations.getCommitHistory(req.params.commitLength);
        res.send(history);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.post('/commits', async (req, res) => {
    try {
        const newCommit = new Commit({
            message: req.body.message,
            author: req.body.author,
            parentHash: req.body.parentHash,
            branch: req.body.branch
        });
        await newCommit.save();
        res.status(201).send(newDomain);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Use the router on the app
app.use(router);
module.exports = router; 

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
