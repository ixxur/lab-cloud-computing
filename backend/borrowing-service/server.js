const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const borrowingRoutes = require('./routes/borrowingRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Borrow Service DB Connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/borrows', borrowingRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Borrow Service listening on port ${PORT}`));
