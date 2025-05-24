const db = require('../config/db');

const addSchool = (data, callback) => {
    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(sql, [data.name, data.address, data.latitude, data.longitude], callback);
};

const getAllSchools = callback => {
    const sql = 'SELECT * FROM schools';
    db.query(sql, callback);
};

module.exports = { addSchool, getAllSchools };
