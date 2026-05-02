"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncCartToDBService = exports.getCartFromDBService = void 0;
// OBTENER el carrito de la BD cuando el usuario entra desde otro dispositivo
const getCartFromDBService = async (userId) => {
    let cart = await prisma.cart.findFirst({
        where: { userId, isAbandoned: false },
        include: { items: { include: { product: true } } }
    });
    if (!cart)
        return []; // Si no tiene carrito, devuelve vacío
    // Formateamos los datos para que el Frontend los entienda igual que el LocalStorage
    return cart.items.map(item => ({
        product: item.product,
        quantity: item.quantity
    }));
};
exports.getCartFromDBService = getCartFromDBService;
// SINCRONIZAR el carrito (Guardar lo que hay en el LocalStorage hacia la BD)
const syncCartToDBService = async (userId, items) => {
    // 1. Buscamos si ya tiene un carrito abierto en la BD
    let cart = await prisma.cart.findFirst({
        where: { userId, isAbandoned: false }
    });
    // 2. Si no tiene, lo creamos
    if (!cart) {
        cart = await prisma.cart.create({ data: { userId } });
    }
    // 3. Borramos los items viejos de la BD para poner los nuevos (evita duplicados)
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    // 4. Insertamos los items actuales del Frontend en la BD
    if (items.length > 0) {
        await prisma.cartItem.createMany({
            data: items.map(item => ({
                cartId: cart.id,
                productId: item.product.id,
                quantity: item.quantity
            }))
        });
    }
    return { success: true };
};
exports.syncCartToDBService = syncCartToDBService;
