import  express  from "express";
import morgan from 'morgan';
import paymentRouter from './routes/payment.routes.js'
import { PORT } from "./config.js";

const app = express()

app.use(morgan('dev'))

app.use(paymentRouter);

app.listen(PORT)
console.log('Server on port',PORT)