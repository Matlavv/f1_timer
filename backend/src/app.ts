import express from 'express';
import { connectToMongo } from './config/connection';
import userRouter from './routes/user.route';
import timerRouter from './routes/timer.route';
import { loggerMiddleware } from './middlewares/logger.middleware';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { setupSwagger } from './config/swagger';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(loggerMiddleware);

setupSwagger(app);

(async () => {
  console.log('Starting application...');
  try {
    await connectToMongo();

    if (mongoose.connection.readyState === 1) {
      app.use('/users', userRouter);
      app.use('/timers', timerRouter);

      app.get('/', (req, res) => {
        res.send('Hello World!');
      });

      if (process.env.NODE_ENV !== 'test') {
        app.listen(port, () => {
          console.log(`Server is running at http://localhost:${port}`);
        });
      }
    } else {
      throw new Error('Failed to connect to MongoDB');
    }
  } catch (error) {
    console.error(error);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
})();

export default app;
