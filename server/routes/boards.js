const express = require('express');
const router = express.Router();

// In-memory boards storage for illustration; replace with database in production
let boards = [];

// Create a new board
router.post('/', (req, res) => {
    const { name } = req.body;
    const newBoard = { id: boards.length + 1, name };
    boards.push(newBoard);
    res.status(201).json(newBoard);
});

// Get all boards
router.get('/', (req, res) => {
    res.json(boards);
});

// Get a specific board
router.get('/:id', (req, res) => {
    const board = boards.find(b => b.id === parseInt(req.params.id));
    if (!board) return res.status(404).send('Board not found');
    res.json(board);
});

// Update a board
router.put('/:id', (req, res) => {
    const board = boards.find(b => b.id === parseInt(req.params.id));
    if (!board) return res.status(404).send('Board not found');
    
    const { name } = req.body;
    board.name = name;
    res.json(board);
});

// Delete a board
router.delete('/:id', (req, res) => {
    const boardIndex = boards.findIndex(b => b.id === parseInt(req.params.id));
    if (boardIndex === -1) return res.status(404).send('Board not found');

    const deletedBoard = boards.splice(boardIndex, 1);
    res.json(deletedBoard);
});

module.exports = router;