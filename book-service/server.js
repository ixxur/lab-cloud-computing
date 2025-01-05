const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Book Service DB Connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Book Service listening on port ${PORT}`));
