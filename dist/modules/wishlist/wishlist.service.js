"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleWishlistService = exports.getWishlistService = void 0;
const getWishlistService = async (userId) => {
    return await prisma.wishlist.findMany({
        where: { userId },
        include: { product: true },
        orderBy: { createdAt: 'desc' }
    });
};
exports.getWishlistService = getWishlistService;
const toggleWishlistService = async (userId, productId) => {
    // Buscamos si ya existe en la lista de deseos
    const existing = await prisma.wishlist.findUnique({
        where: { userId_productId: { userId, productId } }
    });
    if (existing) {
        // Si existe, lo borramos
        await prisma.wishlist.delete({ where: { id: existing.id } });
        return { action: 'removed' };
    }
    else {
        // Si no existe, lo añadimos
        await prisma.wishlist.create({ data: { userId, productId } });
        return { action: 'added' };
    }
};
exports.toggleWishlistService = toggleWishlistService;
