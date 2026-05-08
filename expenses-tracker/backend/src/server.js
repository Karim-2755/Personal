console.log('Starting server...');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const errorHandler = require('./middleware/errorHandler');

console.log('All modules loaded');
dotenv.config({ path: path.join(__dirname, '../.env') });

const startServer = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected');

    const app = express();
    const allowedOrigins = [
      'http://localhost:4200',
      'http://localhost:5828',
      'http://localhost:1877',
      'http://127.0.0.1:1877',
      'http://127.0.0.1:5828',
      'http://127.0.0.1:4200'
    ];

    app.use(cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS blocked for origin: ${origin}`));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.options('*', cors());
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
