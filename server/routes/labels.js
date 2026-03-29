const express = require('express');
const router = express.Router();

// Sample In-Memory Database (Replace with actual DB)
let labels = [];

// GET all labels
router.get('/', (req, res) => {
    res.json(labels);
});

// POST a new label
router.post('/', (req, res) => {
    const { name, color } = req.body;
    const newLabel = { id: labels.length + 1, name, color }; // Simple ID generation
    labels.push(newLabel);
    res.status(201).json(newLabel);
});

// PUT update a label by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, color } = req.body;
    const label = labels.find(label => label.id === parseInt(id));

    if (!label) return res.status(404).send('Label not found');

    label.name = name;
    label.color = color;
    res.json(label);
});

// DELETE a label by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    labels = labels.filter(label => label.id !== parseInt(id));
    res.status(204).send();
});

module.exports = router;