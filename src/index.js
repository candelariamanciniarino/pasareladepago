import  express  from "express";
import morgan from 'morgan';
import paymentRoutes from './routes/payment.routes.js'
import { PORT } from "./config.js";
import path from 'path';

const app = express()

const port =process.env.PORT || 3000

app.use(morgan('dev'))

app.use(paymentRoutes);
app.use(express.static(path.resolve("src/public")));

app.listen(port,()=>{
    console.log(`port runing in http://localhost:${port}`)
})
/* console.log('Server on port',PORT) */