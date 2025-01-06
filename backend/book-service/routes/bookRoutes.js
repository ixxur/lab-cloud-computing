const express = require('express');
const Book = require('../models/Book');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeAdmin = require('../middleware/authorizeAdmin');

const router = express.Router();

// Create a book
router.post('/add', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.page) || 1; // Default to 1
    const limitNumber = parseInt(req.query.limit) || 10; // Default to 10

    if (pageNumber <= 0 || limitNumber <= 0) {
      return res.status(400).json({ message: 'Page and limit must be positive integers.' });
    }

    const books = await Book.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const total = await Book.countDocuments();

    res.status(200).json({
      total,
      page: pageNumber,
      limit: limitNumber,
      data: books,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a book by id
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).send('Error fetching book: ' + error.message);
  }
});

// Borrow a book
router.put('/:id/borrow', authenticateToken, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    if (!book.available) {
      return res.status(400).send('Book is already borrowed');
    }

    book.available = false;
    await book.save();

    res.status(200).send('Book status updated to borrowed');
  } catch (error) {
    res.status(500).send('Error updating book status: ' + error.message);
  }
});


// Return a book
router.put('/:id/return', authenticateToken, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }

    book.available = true;
    await book.save();

    res.status(200).send('Book status updated to available');
  } catch (error) {
    res.status(500).send('Error updating book status: ' + error.message);
  }
});

module.exports = router;
