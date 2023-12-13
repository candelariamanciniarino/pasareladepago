import  express  from "express";
import morgan from 'morgan';
import router from './routes/payment.routes.js'
import { PORT } from "./config.js";
import path from 'path';
import cors from 'cors';



const app = express()

const port =process.env.PORT || 3000
app.use(cors({
  // origin: 'https://nautica-rios-pf-deploy.netlify.app'
  origin: '*'
}))
app.use(morgan('dev'))

app.use(router);
app.use(express.static(path.resolve("src/public")));

app.listen(port,()=>{
  console.log(`Server on port,${PORT}`)
})