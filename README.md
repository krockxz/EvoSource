# Custom Version Control System

This project implements a basic version control system similar to Git, built with Node.js. It allows users to initialize a new repository, create blobs, commits, and branches, and view commit histories.

## Features
- Initialize new version control repositories
- Create and store blobs from file contents
- Create commits with author information and parent commit references
- Create branches linked to specific commits
- Retrieve commit histories

## Installation

To get started with this custom version control system, follow these steps:

1. Clone the repository:
2. Navigate to the project directory:
3. Install dependencies:

Here's the reformatted API usage guide with clearer curl command examples for your custom version control system. Each section is presented in a more consistent format:

## Initialize Repository

Create a new version control repository:
```markdown
curl --location --request POST 'http://localhost:3000/init'
```

## Create Blob

To create a blob from a file located at a specific path:

```bash
curl --location 'http://localhost:3000/create-blob' \
--header 'Content-Type: application/json' \
--data '{"filePath":"<absolute-path-to-file>"}'
```

## Retrieve Object by Hash

Get the contents of a blob or commit by its hash:

```bash
curl --location 'http://localhost:3000/objects/<hash>'
```

## Create Commit

Create a new commit:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"message": "Your commit message", "author": "Your Name", "parentHash": "optional-parent-hash"}' http://localhost:3000/create-commit
```

## Create Branch

Create a new branch pointing to a specific commit:

```bash
curl -X POST -H "Contenten-Type: application/json" -d '{"name": "branch-name", "commitHash": "commit-hash"}' http://localhost:3000/create-branch
```

## Get Commit History

Retrieve the commit history from a specific commit:

```bash
curl http://localhost:3000/history/<commit-hash>
```
```

This reformatted guide uses consistent bash code blocks for all curl commands, making it easier to read and use. Adjust the placeholders `<absolute-path-to-file>`, `<hash>`, and `<commit-hash>` as necessary to match your specific setup or documentation style.