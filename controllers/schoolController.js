const { addSchool, getAllSchools } = require('../models/schoolModel');

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

exports.addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ message: 'Invalid input' });
    }
    addSchool({ name, address, latitude, longitude }, (err, results) => {
        if (err) return res.status(500).json({ message: 'DB error', error: err });
        res.status(201).json({ message: 'School added successfully', id: results.insertId });
    });
};

exports.listSchools = (req, res) => {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);
    if (isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({ message: 'Invalid coordinates' });
    }
    getAllSchools((err, results) => {
        if (err) return res.status(500).json({ message: 'DB error', error: err });
        const sorted = results.map(school => ({
            ...school,
            distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
        })).sort((a, b) => a.distance - b.distance);
        res.json(sorted);
    });
};
