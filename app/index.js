const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { createGitDirectory, catFile, createBlob, createCommit, createBranch, getCommitHistory} = require('./main'); // Adjust the path as necessary

app.use(express.json());

app.post('/init', (req, res) => {
    const result = createGitDirectory();
    res.send(result);
});

app.get('/objects/:hash', async (req, res) => {
    try {
        const result = await catFile(req.params.hash);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/create-blob', (req, res) => {
    if (!req.body.filePath) {
        return res.status(400).send('File path is required');
    }

    try {
        const hash = createBlob(req.body.filePath);
        const url = `http://${req.hostname}:${port}/objects/${hash}`;
        res.send({ hash: hash, url: url, message: 'Blob created successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/create-commit', (req, res) => {
    const { message, author, parentHash } = req.body;
    const result = createCommit(message, author, parentHash);
    res.send(result);
});

app.post('/create-branch', (req, res) => {
    const { name, commitHash } = req.body;
    try {
        const result = createBranch(name, commitHash);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.get('/history/:commitHash', async (req, res) => {
    try {
        const history = await getCommitHistory(req.params.commitHash);
        res.send(history);
    } catch (error) {
     res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Git service running on http://localhost:${port}`);
});
