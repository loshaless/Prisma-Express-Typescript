import express from 'express';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorMiddleware';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(errorHandler);
app.use('/api/v1', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
