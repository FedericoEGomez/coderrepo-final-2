const fs = require('fs');

class productoController {

    prueba (req,res) {
        try {
            res.status(200).render('productEdit');
        } catch {
            res.status(400).send('vista no encontrada');
        }
        
    }

    async listarProductos (req, res) {
        try{
            const data = await fs.promises.readFile('./tareaCoderHouse/db/product.json', 'utf-8');
            let dataJson = JSON.parse(data);
            res.status(200).render('index', {dataJson} );
        }
        catch{
            res.status(400).send('no se pudieron mostrar los productos');
        }
    }

    async agregarProducto (req, res) {
        try{
            const data = await fs.promises.readFile('./tareaCoderHouse/db/product.json', 'utf-8');
            let dataJson = JSON.parse(data);

            let producto = {
                    id:dataJson.length + 1,
                    name: req.body.name,
                    price: req.body.price,
                    url: req.body.url,
                    description: req.body.description
            }
            dataJson.push({product: producto});    
            
            let productJson = JSON.stringify(dataJson, null, 2)
            await fs.promises.writeFile(`./tareaCoderHouse/db/product.json`,productJson);
            res.status(200).redirect('/');
        } 
        catch {
            res.status(400).send('no se puede guardar el producto');
        }
    }
    
    async productoUnitario(req, res){   
        try {
            const data = await fs.promises.readFile('./tareaCoderHouse/db/product.json', 'utf-8');
            let dataJson = JSON.parse(data); 
            let dataUnit = dataJson.find((producto) => producto.product.id == req.params.id)
            
            res.status(200).render('productUnit', {dataUnit} );
        } catch {
            res.status(400).send('producto no encontrado');
        }
       
    }

    async vistaEditarProducto (req,res) {
        try {
            const data = await fs.promises.readFile('./tareaCoderHouse/db/product.json', 'utf-8');
            let dataJson = JSON.parse(data); 
            let dataToEdit = dataJson.find((producto) => producto.product.id == req.params.id)
        res.status(200).render('productEdit', {dataToEdit} );
        } catch {
            res.status(400).json({error: 'no se pudo editar el producto'});
        }
        
    
    }

    async editarProducto(req, res) {
        try {
            const data = await fs.promises.readFile('./tareaCoderHouse/db/product.json', 'utf-8');
            let dataJson = JSON.parse(data);
            const id = req.params.id;
            const posicion = id-1
            const productoActualizado = {
                id: id,
                name: req.body.name,
                price: req.body.price,
                url:req.body.url,
                description: req.body.description
            };
            dataJson[posicion] = {product: productoActualizado }
            let productJson = JSON.stringify(dataJson, null, 2)
            await fs.promises.writeFile(`./tareaCoderHouse/db/product.json`,productJson);
            res.status(200).redirect('/');
        } catch {
            res.status(400).send('no se pudo editar el producto');
        }
    }

    async borrarProducto(req, res) {
        try {
            const data = await fs.promises.readFile('./tareaCoderHouse/db/product.json', 'utf-8');
            let dataJson = JSON.parse(data); 
            await fs.promises.unlink('./tareaCoderHouse/db/product.json')
            let dataClear = dataJson.filter((producto) => producto.product.id != req.params.id);
            let productJson = JSON.stringify(dataClear, null, 2)
            await fs.promises.writeFile(`./tareaCoderHouse/db/product.json`,productJson);
            res.status(200).redirect('/'); 
        } catch {
            res.status(400).send('no se pudo borrar el producto');
        }
    }

    async borrarTodo(req, res){
        try {
            const data = await fs.promises.readFile('./tareaCoderHouse/db/product.json', 'utf-8');
            let dataJson = JSON.parse(data);
            dataJson = []
            let productJson = JSON.stringify(dataJson, null, 2)
            await fs.promises.writeFile(`./tareaCoderHouse/db/product.json`,productJson);
            res.status(200).redirect('/');
        } catch {
            res.status(400).send('no se puedieron borrar todos los productos');
        }
    }

}

module.exports = productoController