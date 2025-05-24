require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const schoolRoutes = require('./routes/schoolRoutes');

app.use(express.json());
app.use('/api', schoolRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get('/', (req, res) => {
    res.send('School Management API is running.');
});