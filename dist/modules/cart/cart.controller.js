"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncCart = exports.getCart = void 0;
const cart_service_1 = require("./cart.service");
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const items = await (0, cart_service_1.getCartFromDBService)(userId);
        res.json(items);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getCart = getCart;
const syncCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items } = req.body;
        await (0, cart_service_1.syncCartToDBService)(userId, items);
        res.json({ message: 'Carrito sincronizado' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.syncCart = syncCart;
