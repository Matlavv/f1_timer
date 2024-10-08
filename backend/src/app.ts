import express from 'express';
import { connectToMongo } from './config/connection';
import userRouter from './routes/user.route';
import timerRouter from './routes/timer.route';
import { loggerMiddleware } from './middlewares/logger.middleware';

const app = express();
const port = 3001;

app.use(express.json());
app.use(loggerMiddleware);

(async () => {
  console.log('Starting application...');
  const client = await connectToMongo();

  if (client) {
    app.use('/users', userRouter);
    app.use('/timers', timerRouter);

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } else {
    console.error('Failed to connect to MongoDB, exiting...');
    process.exit(1);
  }
})();
