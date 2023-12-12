import mercadopago from 'mercadopago';
import { ACCESS_TOKEN } from '../config.js';


export const createOrder = async (req, res) => {
  // Inicializa MercadoPago con tu token de acceso
  mercadopago.configure({
    access_token: ACCESS_TOKEN,
  });
  const items = req.body.items;
  console.log(items)
try{
  const result = await mercadopago.preferences.create ({
    
    items,
    back_urls:{
      success:"http://localhost:3000/success",
      //failure:"http://localhost:3000/failure",
     // pending:"http://localhost:3000/pending",

    },

    notification_url:"https://4f39-2800-40-37-472-9d0a-cba4-da0a-7b.ngrok.io/webhook",

    
  
  });
  console.log(result);
  res.send(result.body);
}catch(error){
  return res.status(500).json({ message: "Something goes wrong" });
}
};

export const receiveWebhook = async (req,res) => {
  try {
  const payment = req.query;
  console.log(payment);
   
  if(payment.type === "payment"){
    const data = await mercadopago.payment.findById(payment["data.id"]);
    console.log(data);
  } 
  res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({error:error.message});
  }





}