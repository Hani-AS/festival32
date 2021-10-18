import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import festivalRouter from './routes/festivalRoute.js';
import paymentRouter from './routes/paymentRoute.js';
import ticketRouter from './routes/ticketsRoute.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';
import scheduleRouter from './routes/scheduleRoute.js';
import createPdfRouter from './routes/createPdfRouter.js';
import sendEmail from './utils/sendEmail.js';
if (1 == 2) {
  sendEmail().catch(console.error);
}
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

// festival route
app.use('/festival', festivalRouter);
// payment route
app.use('/payment', paymentRouter);
// pdf order route
app.use('/pdf', createPdfRouter);
// user route
app.use('/user', userRouter);

app.use('/order', orderRouter);
app.use('/tickets', ticketRouter);
app.use('/schedule', scheduleRouter);

app.get('/', (req, res) => {
  res.send('WELCOME TO OUR API!');
});

startServer();
