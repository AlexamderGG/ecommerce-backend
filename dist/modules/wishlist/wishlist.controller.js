"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleWishlist = exports.getWishlist = void 0;
const wishlist_service_1 = require("./wishlist.service");
const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await (0, wishlist_service_1.getWishlistService)(userId);
        // Formateamos para que el frontend solo reciba un array de productos
        const products = wishlist.map(item => item.product);
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getWishlist = getWishlist;
const toggleWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        const result = await (0, wishlist_service_1.toggleWishlistService)(userId, productId);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.toggleWishlist = toggleWishlist;
