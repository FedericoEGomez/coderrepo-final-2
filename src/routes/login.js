import express from "express";
import auth from "../middlewares/auth.js"
const router = new express.Router();

router.get("/login",(req, res)=>{
 const {user, pass} = req.query
 if(!user  || !pass ){
     return res.send('login false')
 }
 req.session.user = user
 res.status(200).send('login correct, hola ' + user)
})

router.get('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        rollogin: true 
    })
    res.send('deslogeado')
})

router.get('/information', auth ,(req, res)=>{
    res.send("Estas logeado aca esta la informacion")
})

export { router }