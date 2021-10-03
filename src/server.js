import express from 'express';
import cors from 'cors';
import { carritosRouter, productosRouter, testRouter } from './routes/index.js';



const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/productos', productosRouter.router)
app.use('/carritos', carritosRouter.router)
app.use('/api/productos-test', testRouter.router)


export{ app }