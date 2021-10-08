import express from 'express';
import cors from 'cors';
import { carritosRouter, productosRouter, testRouter , login} from './routes/index.js';
import session from 'express-session';
import MongoStore from 'connect-mongo'


const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const options = {
    userNewUrlPaser: true,
    useUnifiedTopology: true
}
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODBURI,
        options
    }),
    resave: false,
    seveUninitialized: false,
    secret: process.env.SECRET_SESSION,
    cookie:{
        maxAge:30000*10,
        expires: true
    },
    rolling: true
}))

app.use('/user', login.router)
app.use('/productos', productosRouter.router)
app.use('/carritos', carritosRouter.router)
app.use('/api/productos-test', testRouter.router)


export{ app }