const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  optionsSuccessStatus: 200
};

app.use(cors('*')); // Enable CORS with the specified options

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(express.json());

// Use API Routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
