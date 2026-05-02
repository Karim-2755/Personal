console.log('Starting server...');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const errorHandler = require('./middleware/errorHandler');

console.log('All modules loaded');
dotenv.config();

const startServer = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected');

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(morgan('dev'));

    app.use('/api/auth', authRoutes);
    app.use('/api/expenses', expenseRoutes);

    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server failed to start:', error.message);
    process.exit(1);
  }
};

console.log('Calling startServer...');
startServer();
