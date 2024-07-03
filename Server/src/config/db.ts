import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI ?? "mongodb://localhost:27017/Pomodoro").then(() => {

    console.log('MongoDB connected');
  }).catch((error:any) => {
    console.error('MongoDB connection error:', error);
  });
export const mongo = mongoose.connection 

  