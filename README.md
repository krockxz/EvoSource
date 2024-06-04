Curls : 
2.curl --location 'http://localhost:3000/create-blob' \
--header 'Content-Type: application/json' \
--data '{"filePath":"D:/work/code/git/example.txt"}'

3.curl --location 'http://localhost:3000/objects/3bddedb6f012bd45f55a2f66da3e9f9e65f0f1b6'

# Create a commit
curl -X POST -H "Content-Type: application/json" -d '{"message": "Initial commit", "author": "Your Name"}' http://localhost:3000/create-commit

# Create a branch
curl -X POST -H "Content-Type: application/json" -d '{"name": "feature-branch", "commitHash": "abc123"}' http://localhost:3000/create-branch

# Get commit history
curl http://localhost:3000/history/abc123

