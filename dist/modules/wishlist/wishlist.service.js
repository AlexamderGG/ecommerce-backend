"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleWishlistService = exports.getWishlistService = void 0;
const database_1 = __importDefault(require("../../config/database"));
const getWishlistService = async (userId) => {
    return await database_1.default.wishlist.findMany({
        where: { userId },
        include: { product: true },
        orderBy: { createdAt: 'desc' }
    });
};
exports.getWishlistService = getWishlistService;
const toggleWishlistService = async (userId, productId) => {
    // Buscamos si ya existe en la lista de deseos
    const existing = await database_1.default.wishlist.findUnique({
        where: { userId_productId: { userId, productId } }
    });
    if (existing) {
        // Si existe, lo borramos
        await database_1.default.wishlist.delete({ where: { id: existing.id } });
        return { action: 'removed' };
    }
    else {
        // Si no existe, lo añadimos
        await database_1.default.wishlist.create({ data: { userId, productId } });
        return { action: 'added' };
    }
};
exports.toggleWishlistService = toggleWishlistService;
