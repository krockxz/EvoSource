const express = require('express');
const mongoose = require('mongoose');
const gitOperationsRouter = require('./routes/gitOperations'); // Make sure this path is correct
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/', gitOperationsRouter);

mongoose.connect('mongodb://localhost:27017/gitdb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Error connecting to MongoDB:', err));


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
