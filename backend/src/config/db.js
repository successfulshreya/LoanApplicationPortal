import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('MONGO_URI is missing. Check backend/.env');
  }

  const conn = await mongoose.connect(uri);
  console.log(`MongoDB Connected: yeahhh! ${conn.connection.host}`);
};

export default connectDB;