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
import verificationRouter from './routes/verificationRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// const whitelist = [
//   'http://localhost:3000',
//   'https://festival32.netlify.app',
//   'http://localhost:5000',
// ];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };
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

// verfied route
app.use('/verification', verificationRouter);

app.get('/', (req, res) => {
  res.send('WELCOME TO OUR API!');
});

startServer();
