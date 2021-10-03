import { testService } from "../services/index.js"

export async function postProductosFaker( req, res,next ) {
    const cant = req.query.cant
    try {
         await testService.postProduct(cant)
        res.status(200).json("Productos creados con exito")
    } catch (e) {
        next(e)  
    }
}
export async function getProductosFaker( req, res ) {
    try {
        const respuesta = await testService.getProductos() 
        res.status(200).json({productos: respuesta})
    } catch (e) {
        res.status(400).send(e.message)
        
    }
}