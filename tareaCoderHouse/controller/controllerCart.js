const fs = require('fs') 



class cartController {
    prueba (req,res) {
        try {
            res.status(200).render('cartList');
        } catch {
            res.status(400).send('vista no encontrada');
        }
        
    }
    async agregarAlCarrito(req, res){
        try{
            //abre carrito
            const data = await fs.promises.readFile('./tareaCoderHouse/db/cart.json', 'utf-8');
            let dataJson = JSON.parse(data);
            //abre productos
            const dataProduct = await fs.promises.readFile('./tareaCoderHouse/db/product.json', 'utf-8');
            let dataProductJson = JSON.parse(dataProduct); 
            let cartUnit = dataJson.find((cart) => cart.id == req.body.number)
            let dataUnit = dataProductJson.find((producto) => producto.product.id == req.body.id)
           
            if(cartUnit){
                cartUnit.cart.push(dataUnit);    
                let cartJson = JSON.stringify(dataJson, null, 2)
                await fs.promises.writeFile(`./tareaCoderHouse/db/cart.json`,cartJson);
                res.status(200).redirect('/cart');
            }else{
                let carrito = []
                carrito.push(dataUnit)
                dataJson.push({id: req.body.number, cart: carrito});  
                let cartJson = JSON.stringify(dataJson, null, 2)
                await fs.promises.writeFile(`./tareaCoderHouse/db/cart.json`,cartJson);
                res.status(200).redirect('/cart');
            }
        } 
        catch {
            res.status(400).send('no se puede guardar el producto');
        }
    }

    async listaCarritos (req, res){
        try{
            const data = await fs.promises.readFile('./tareaCoderHouse/db/cart.json', 'utf-8');
            let dataJson = JSON.parse(data);
            res.status(200).render('cart', {dataJson} );
        }
        catch{
            res.status(400).send('no se pudieron mostrar los productos');
        }
    }

    async detalleCarrito(req, res){
        try {
            const data = await fs.promises.readFile('./tareaCoderHouse/db/cart.json', 'utf-8');
            let dataJson = JSON.parse(data); 
            let dataUnit = dataJson.find((cart) => cart.id == req.params.id)
            res.status(200).render('cartList', {dataUnit} );
        } catch {
            res.status(400).send('no se pudieron mostrar los productos');
        }
    }

    async borrarLista(req, res){
        try {
            const data = await fs.promises.readFile('./tareaCoderHouse/db/cart.json', 'utf-8');
            let dataJson = JSON.parse(data); 
            await fs.promises.unlink('./tareaCoderHouse/db/cart.json')
            let dataClear = dataJson.filter((cart) => cart.id != req.params.id);
            let productJson = JSON.stringify(dataClear, null, 2)
            await fs.promises.writeFile(`./tareaCoderHouse/db/cart.json`,productJson);
            res.status(200).redirect('/cart'); 
        } catch {
            res.status(400).send('no se pudo borrar el producto');
        }
    }
    async borrarProdcutoLista(req, res){
        try {
            const data = await fs.promises.readFile('./tareaCoderHouse/db/cart.json', 'utf-8');
            let dataJson = JSON.parse(data); 
            await fs.promises.unlink('./tareaCoderHouse/db/cart.json')
            let dataClear = dataJson.filter((cart) => cart.cart.product.id != req.params.id);
            let productJson = JSON.stringify(dataClear, null, 2)
            await fs.promises.writeFile(`./tareaCoderHouse/db/cart.json`,productJson);
            res.status(200).redirect('/cart'); 
        } catch {
            res.status(400).send('no se pudo borrar el producto');
        }
    }

    async borrarTodo(req, res){
        try {
            const data = await fs.promises.readFile('./tareaCoderHouse/db/cart.json', 'utf-8');
            let dataJson = JSON.parse(data);
            dataJson = []
            let productJson = JSON.stringify(dataJson, null, 2)
            await fs.promises.writeFile(`./tareaCoderHouse/db/cart.json`,productJson);
            res.status(200).redirect('/cart');
        } catch {
            res.status(400).send('no se puedieron borrar todos los productos');
        }
    }
}


module.exports = cartController