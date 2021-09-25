import {app} from './server.js'
import dotenv from 'dotenv'
import './db.js'

dotenv.config()


app.listen(process.env.PORT,()=> console.log(`Server on port ${process.env.PORT}`))