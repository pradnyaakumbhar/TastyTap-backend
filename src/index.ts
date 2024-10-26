import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log('Connected to MongoDB');
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', async (req: Request, res: Response) => {
  res.send({ message: 'health OK!' });
});

app.use('/api/user', userRoute);

app.listen(7000, () => {
  console.log('Server is running on port 7000');
});
