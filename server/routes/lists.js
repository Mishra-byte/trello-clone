const express = require('express');
const router = express.Router();

// Sample lists data
let lists = [
    { id: 1, name: 'To-Do', tasks: [] },
    { id: 2, name: 'In Progress', tasks: [] },
    { id: 3, name: 'Done', tasks: [] }
];

// Get all lists
router.get('/', (req, res) => {
    res.json(lists);
});

// Create a new list
router.post('/', (req, res) => {
    const newList = { id: lists.length + 1, name: req.body.name, tasks: [] };
    lists.push(newList);
    res.status(201).json(newList);
});

// Update a list
router.put('/:id', (req, res) => {
    const listId = parseInt(req.params.id);
    const listIndex = lists.findIndex(list => list.id === listId);
    if (listIndex !== -1) {
        lists[listIndex].name = req.body.name;
        res.json(lists[listIndex]);
    } else {
        res.status(404).send('List not found');
    }
});

// Delete a list
router.delete('/:id', (req, res) => {
    const listId = parseInt(req.params.id);
    lists = lists.filter(list => list.id !== listId);
    res.status(204).send();
});

// Drag and drop reordering
router.post('/reorder', (req, res) => {
    const { sourceIndex, destinationIndex } = req.body;
    const [movedList] = lists.splice(sourceIndex, 1);
    lists.splice(destinationIndex, 0, movedList);
    res.json(lists);
});

module.exports = router;