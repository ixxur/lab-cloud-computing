const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const axios = require('axios');
const bookServiceUrl = process.env.BOOK_SERVICE_URL;
const Borrow = require('../models/Borrow');

const router = express.Router();

// Borrow a book
router.post('/:bookId/borrow', authenticateToken, async (req, res) => {
    const { bookId } = req.params;

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
        await axios.put(`${bookServiceUrl}/api/books/${bookId}/borrow`, null, {
            headers: { Authorization: req.header('Authorization') },
        });

        res.status(201).json({ message: 'Book borrowed successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error borrowing book', details: error.message });
    }
});

// Get all borrows
router.get('/', authenticateToken, async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.page) || 1; // Default to 1
        const limitNumber = parseInt(req.query.limit) || 10; // Default to 10

        if (pageNumber <= 0 || limitNumber <= 0) {
            return res.status(400).json({ message: 'Page and limit must be positive integers.' });
        }

        const borrows = await Borrow.find({ userId: req.user.id })
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

        const total = await Borrow.countDocuments({ userId: req.user.id });

        res.status(200).json({
            total,
            page: pageNumber,
            limit: limitNumber,
            data: borrows,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Return a borrowed book
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
        await axios.put(
            `${bookServiceUrl}/api/books/${borrow.bookId}/return`,
            null,
            {
                headers: { Authorization: req.header('Authorization') }, 
            }
        );

        borrow.returnDate = new Date();
        await borrow.save();

        res.status(200).json({ message: 'Book returned successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error returning book', details: error.message });
    }
});

module.exports = router;
