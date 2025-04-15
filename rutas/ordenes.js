const express = require('express');
const router = express.Router();

// Importar controladores
const {
   getPedidos,
   getPedidoById,
   createPedido,
   updatePedido,
   deletePedido,
   getEstadoPedido,
} = require('../controllers/pedidos.controller');

// Ruta para obtener todos los pedidos
router.get('/pedidos', getPedidos);

// Ruta para obtener un pedido específico por ID
router.get('/pedidos/:id', getPedidoById);

// Ruta para crear un nuevo pedido
router.post('/pedidos', createPedido);

// Ruta para actualizar un pedido existente
router.put('/pedidos/:id', updatePedido);

// Ruta para eliminar un pedido
router.delete('/pedidos/:id', deletePedido);

// Ruta para consultar el estado de un pedido
router.get('/pedidos/:id/estado', getEstadoPedido);

module.exports = router;
