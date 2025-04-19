const express = require('express')
const axios = require('axios');
require('dotenv').config();
require('./db')
const cors = require('cors');

const incidentRouter = require('./routes/incident')
const app = express()

const PORT = process.env.PORT || 8000
app.use(cors());
app.use(express.json())
app.use('/api/incident', incidentRouter);
app.use('/api', require('./routes/ai'));

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('<h1>Hello Express and Hello world</h1>')
})