const { readOrders, writeOrders } = require('../utils/orderService');
const promos = require('../data/promos.json'); 

// Obtener todos los pedidos
exports.getPedidos = async (req, res) => {
  try {
    const orders = await readOrders(); 
    res.json(orders);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los pedidos', error: error.message });
  }
};

// Obtener un pedido por ID
exports.getPedidoById = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await readOrders();
    const pedido = orders.find(p => p.id === parseInt(id));
    if (pedido) {
      res.json(pedido);
    } else {
      res.status(400).json({ mensaje: 'Pedido no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el pedido', error: error.message });
  }
};

// Crear un nuevo pedido
exports.createPedido = async (req, res) => {
  const { cliente, pedido, direccion, pago } = req.body;

  // Verificación
  if (!cliente || !pedido || !direccion || !pago) {
    return res.status(400).send('Falta información para crear el pedido');
  }

  const nuevoPedido = {
    id: Date.now(),
    cliente,
    pedido,
    direccion,
    pago,
    estado: 'pendiente',
  };

  try {
    const orders = await readOrders();
    orders.push(nuevoPedido);
    await writeOrders(orders);
    res.status(200).json(nuevoPedido);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el pedido', error: error.message });
  }
};

// Actualizar un pedido
exports.updatePedido = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const orders = await readOrders();
    const pedidoIndex = orders.findIndex(p => p.id === parseInt(id));

    if (pedidoIndex !== -1) {
      orders[pedidoIndex] = { ...orders[pedidoIndex], ...updatedData };
      await writeOrders(orders);
      res.json(orders[pedidoIndex]);
    } else {
      res.status(400).json({ mensaje: 'Pedido no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el pedido', error: error.message });
  }
};

// Eliminar un pedido
exports.deletePedido = async (req, res) => {
  const { id } = req.params;

  try {
    const orders = await readOrders();
    const pedidoIndex = orders.findIndex(p => p.id === parseInt(id));

    if (pedidoIndex !== -1) {
      orders.splice(pedidoIndex, 1);
      await writeOrders(orders); 
      res.json({ mensaje: 'Pedido eliminado' });
    } else {
      res.status(400).json({ mensaje: 'Pedido no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el pedido', error: error.message });
  }
};

// Estado de un pedido
exports.getEstadoPedido = async (req, res) => {
  const { id } = req.params;

  try {
    const orders = await readOrders();
    const pedido = orders.find(p => p.id === parseInt(id));

    if (pedido) {
      res.json({ estado: pedido.estado || 'pendiente' });
    } else {
      res.status(400).json({ mensaje: 'Pedido no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el estado del pedido', error: error.message });
  }
};


