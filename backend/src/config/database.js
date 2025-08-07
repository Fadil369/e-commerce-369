const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Skip MongoDB connection if not available (for demo purposes)
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI === 'mongodb://localhost:27017/ecommerce369') {
      console.log('📦 MongoDB connection skipped (demo mode)');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔄 MongoDB connection closed.');
      process.exit(0);
    });

  } catch (error) {
    console.log('📦 MongoDB connection skipped (demo mode) - Database not available');
    // Don't exit the process in demo mode
  }
};

module.exports = connectDB;