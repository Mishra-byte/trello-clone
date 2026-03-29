const express = require('express');
const router = express.Router();

// Sample in-memory data store for cards
let cards = [];

// Create a new card
router.post('/', (req, res) => {
    const { title, content } = req.body;
    const newCard = { id: cards.length + 1, title, content };
    cards.push(newCard);
    res.status(201).json(newCard);
});

// Get all cards
router.get('/', (req, res) => {
    res.json(cards);
});

// Update a card
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const card = cards.find(c => c.id == id);
    if (card) {
        card.title = title;
        card.content = content;
        res.json(card);
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

// Delete a card
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    cards = cards.filter(c => c.id != id);
    res.status(204).send();
});

// Reorder cards (drag-drop)
router.post('/reorder', (req, res) => {
    const { orderedIds } = req.body;
    cards = orderedIds.map(id => cards.find(card => card.id == id)).filter(Boolean);
    res.json(cards);
});

module.exports = router;