"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.createOrder = void 0;
const orders_service_1 = require("./orders.service");
const createOrder = async (req, res) => {
    try {
        // ¡Mágia! El middleware inyectó el usuario real en req.user
        const userId = req.user.id;
        const { items, shippingCost } = req.body;
        if (!items || items.length === 0) {
            res.status(400).json({ message: 'El carrito está vacío' });
            return;
        }
        // Enviamos el userId real que viene del token
        const order = await (0, orders_service_1.createOrderService)({ userId, items, shippingCost });
        res.status(201).json(order);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createOrder = createOrder;
const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await (0, orders_service_1.getOrdersByUserService)(userId);
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getOrders = getOrders;
