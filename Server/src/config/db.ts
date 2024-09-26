/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://pomodoro:Satyam2481@pomodoro.ve5qh0t.mongodb.net/Pomodoro?retryWrites=true&w=majority').then(() => {

    console.log('MongoDB connected');
  }).catch((error:any) => {
    console.error('MongoDB connection error:', error);
  });
export const mongo = mongoose.connection 

  