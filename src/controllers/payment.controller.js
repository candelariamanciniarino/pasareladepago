//Importo la base de datos
import { db } from "../../firebase-config.js";
import { collection, getDocs, addDoc, where, query, doc, getDoc } from "firebase/firestore";

import mercadopago from 'mercadopago';
import { ACCESS_TOKEN } from '../config.js';


const contarProducto = (prod,carr) => {
  let count = 0;
  carr.forEach((product) => {
    if (product.id === prod.id) {
      count++;
    }
  });
  return count;
};


export const createOrder = async (req, res) => {
//  Inicializa MercadoPago con tu token de acceso
  mercadopago.configure({
    access_token: ACCESS_TOKEN,
  });

  let items = []
  const uid = req.query.id
  
  try{
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    const datosUsuario = await userSnap.data();
    const carr = datosUsuario.carrito
    
    carr.map((prod,i) =>
        items.find((x) => x.title === prod.nombre)
          ? null
          : items=[...items,{id:i,title:prod.nombre, quantity: contarProducto(prod,carr),unit_price:prod.precio,currency_id: "ARS",
        }]
      )
    const result = await mercadopago.preferences.create ({
      items,
      back_urls:{
        success:`https://nautica-rios-pf-deploy.netlify.app/success/${uid}`,
        failure:"https://nautica-rios-pf-deploy.netlify.app/fail",
      // pending:"http://localhost:3000/pending",

      },
      notification_url:"https://4f39-2800-40-37-472-9d0a-cba4-da0a-7b.ngrok.io/webhook",
    });
    res.send(result.body);
  }catch(error){
        return res.status(500).json({ message: "Something goes wrong: " + error.message });
    }

return res.status(200).json(req.body)

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
