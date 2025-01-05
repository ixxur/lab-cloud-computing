const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const axios = require('axios');
const bookServiceUrl = process.env.BOOK_SERVICE_URL;
const Borrow = require('../models/Borrow');

const router = express.Router();

// Borrow a book
router.post('/borrow', authenticateToken, async (req, res) => {
    const { bookId } = req.body;

    try {
        // Check book availability from book-service
        const bookResponse = await axios.get(`${bookServiceUrl}/api/books/${bookId}`);
        if (!bookResponse.data.available) {
            return res.status(400).send('Book is not available for borrowing.');
        }

        // Create a borrow record
        const borrow = new Borrow({
            userId: req.user.id,
            bookId,
            borrowDate: new Date(),
        });
        await borrow.save();

        // Update book status in book-service
        await axios.put(`${bookServiceUrl}/api/books/${bookId}/borrow`);

        res.status(201).json({ message: 'Book borrowed successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error borrowing book', details: error.message });
    }
});

// Get all borrows
router.get('/', authenticateToken, async (req, res) => {
    try {
        const borrows = await Borrow.find({ userId: req.user.id });
        res.status(200).json(borrows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/:id/return', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        // Find the borrow record
        const borrow = await Borrow.findById(id);
        if (!borrow) {
            return res.status(404).json({ error: 'Borrow record not found' });
        }

        if (borrow.userId !== req.user.id) {
            return res.status(403).json({ error: 'You are not authorized to return this book.' });
        }

        // Update book status in book-service
        await axios.put(`${bookServiceUrl}/api/books/${borrow.bookId}/return`);

        borrow.returnDate = new Date();
        await borrow.save();

        res.status(200).json({ message: 'Book returned successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error returning book', details: error.message });
    }
});

module.exports = router;
