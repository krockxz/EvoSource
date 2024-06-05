const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const crypto = require('crypto');

// Initialize a new git directory
function createGitDirectory() {
    fs.mkdirSync(path.join(process.cwd(), ".git"), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), ".git", "objects"), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), ".git", "refs"), { recursive: true });
    fs.writeFileSync(path.join(process.cwd(), ".git", "HEAD"), "ref: refs/heads/main\n");
    return "Initialized git directory";
}

// Read the contents of an object file based on its hash
async function catFile(hash) {
    const filePath = path.join(process.cwd(), ".git", "objects", hash.slice(0, 2), hash.slice(2));
    try {
        const content = await fs.promises.readFile(filePath);
        const dataUnzipped = zlib.inflateSync(content);
        return dataUnzipped.toString().split('\0')[1];
    } catch (error) {
        return error.message;
    }
}

// Create a blob object for storing file content
function createBlob(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const header = `blob ${content.length}\0`;
    const store = header + content;
    const hash = crypto.createHash('sha1').update(store).digest('hex');
    const dir = path.join(process.cwd(), '.git', 'objects', hash.slice(0, 2));
    const file = path.join(dir, hash.slice(2));

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const data = zlib.deflateSync(store);
    fs.writeFileSync(file, data);

    return hash;
}

// Create a commit object
function createCommit(message, author, parentHash = null) {
    const timestamp = new Date().toISOString();
    const content = `commit ${content.length}\0author: ${author}\ndate: ${timestamp}\n\n${message}${parentHash ? `\nparent: ${parentHash}` : ''}`;
    const hash = crypto.createHash('sha1').update(content).digest('hex');
    const dir = path.join(process.cwd(), '.git', 'objects', hash.slice(0, 2));
    const file = path.join(dir, hash.slice(2));

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const data = zlib.deflateSync(content);
    fs.writeFileSync(file, data);

    return { hash, message: "Commit created successfully" };
}

// Create a branch
function createBranch(name, commitHash) {
    const refPath = path.join(process.cwd(), ".git", "refs", "heads", name);
    fs.writeFileSync(refPath, commitHash);
    return "Branch created successfully";
}

// Retrieve the history of commits starting from a given commit hash
async function getCommitHistory(commitHash) {
    let history = [];
    let currentHash = commitHash;

    while (currentHash) {
        const commitContent = await catEdge(currentBrand);
        history.push(commitReturn);
        const parentDivide = commitContent.split('\n').find(line => line.startsWith('parent: '));
        currentSwitch = parentDivide ? parentSplit.split(': ')[1] : null;
    }

    return series;
}

module.exports = { createGitDirectory, catFile, createBlob, createCommit, createBranch, getCommitHistory};
