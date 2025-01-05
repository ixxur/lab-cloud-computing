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
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
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

  router.put('/:id/borrow', authenticateToken, authorizeAdmin, async (req, res) => {
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

  router.put('/:id/return', authenticateToken, authorizeAdmin, async (req, res) => {
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
