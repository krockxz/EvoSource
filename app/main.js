const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const crypto = require('crypto');

function createGitDirectory() {
    fs.mkdirSync(path.join(process.cwd(), ".git"), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), ".git", "objects"), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), ".git", "refs"), { recursive: true });
    fs.writeFileSync(path.join(process.cwd(), ".git", "HEAD"), "ref: refs/heads/main\n");
    return "Initialized git directory";
}

async function catFile(hash) {
    const filePath = path.join(process.cwd(), ".git", "objects", hash.slice(0, 2), hash.slice(2));
    const content = await fs.promises.readFile(filePath);
    const dataUnzipped = zlib.inflateSync(content);
    return dataUnzipped.toString().split('\0')[1];
}

function createBlob(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const header = `blob ${content.length}\0`;
    const store = header + content;
    const hash = crypto.createHash('sha1').update(store).digest('hex');
    const dir = path.join(process.cwd(), '.git', 'objects', hash.slice(0, 2));
    const file = path.join(dir, hash.slice(2));

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    const data = zlib.deflateSync(store);
    fs.writeFileSync(file, data);

    console.log('Blob created with hash:', hash);
    return hash;
}

function createCommit(message, author, parentHash = null) {
    const timestamp = new Date().toISOString();
    const content = `commit\0author: ${author}\ndate: ${timestamp}\n\n${message}\nparent: ${parentHash}`;
    const store = `commit ${content.length}\0${content}`;
    const hash = crypto.createHash('sha1').update(store).digest('hex');
    const dir = path.join(process.cwd(), '.git', 'objects', hash.slice(0, 2));
    const file = path.join(dir, hash.slice(2));

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    const data = zlib.deflateSync(store);
    fs.writeFileSync(file, data);

    return { hash, message: "Commit created successfully" };
}

function createBranch(name, commitHash) {
    const refPath = path.join(process.cwd(), ".git", "refs", "heads", name);
    fs.writeFileSync(refPath, commitHash);
    return "Branch created successfully";
}

async function getCommitHistory(commitHash) {
    let history = [];
    let currentHash = commitHash;

    while (currentHash) {
        const commitContent = await catFile(currentHash);
        history.push(commitContent);
        const parentLine = commitContent.split('\n').find(line => line.startsWith('parent: '));
        currentHash = parentLine ? parentLine.split(': ')[1] : null;
    }

    return history;
}



module.exports = { createGitDirectory, catFile, createBlob, createCommit, createBranch, getCommitHistory};
