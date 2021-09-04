const express = require('express');
const router = express.Router();
const productoController = require('../controller/controllerProduct')
const cartController = require('../controller/controllerCart')
const controller = new productoController
const cart = new cartController


/* home page. */
router.get('/', controller.listarProductos);
router.post('/add', controller.agregarProducto);
router.get('/cart', cart.listaCarritos);
router.post('/addcart',cart.agregarAlCarrito)
router.delete('/delete', controller.borrarTodo);
router.get('/cartview/:id',cart.detalleCarrito);
router.get('/edit/:id', controller.vistaEditarProducto);
router.put('/edit/:id', controller.editarProducto);
router.get('/view/:id', controller.productoUnitario);
router.delete('/del/:id',controller.borrarProducto);
router.delete('/delcart/:id',cart.borrarLista)
router.delete('/delprodcart/:id',cart.borrarProdcutoLista)
module.exports = router;
