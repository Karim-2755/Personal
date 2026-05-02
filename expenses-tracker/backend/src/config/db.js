const mongoose = require('mongoose');

// Flag to indicate if using mock database
let useMockDB = false;

// Simple mock in-memory MongoDB for development when no external MongoDB is available
const mockConnect = async () => {
  console.log('Connected to mock in-memory database (development mode)');
  useMockDB = true;
  return Promise.resolve();
};

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log('Checking MONGO_URI:', uri ? 'SET' : 'NOT SET');
    
    if (uri) {
      console.log('Attempting to connect to external MongoDB...');
      // Try to connect to external MongoDB if URI is provided
      await mongoose.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        connectTimeoutMS: 3000
      });
      console.log('MongoDB connected to external server');
      useMockDB = false;
    } else {
      console.log('No MONGO_URI found, using mock mode');
      // Fall back to mock mode
      await mockConnect();
    }
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Falling back to mock mode from error handler');
    await mockConnect();
  }
};

// Export both the connection function and the flag
module.exports = connectDB;
module.exports.useMockDB = () => useMockDB;
