"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByUserService = exports.createOrderService = void 0;
const createOrderService = async (payload) => {
    const { userId, items, shippingCost = 0 } = payload;
    // Cerramos el carrito abierto para que no se considere "abandonado" ---
    await prisma.cart.updateMany({
        where: { userId, isAbandoned: false },
        data: { isAbandoned: false } // Lo dejamos false, pero podrías cambiar el status si quisieras
    });
    // 1. Obtener los productos de la BD para saber sus precios actuales y stock
    const productIds = items.map(item => item.productId);
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
    if (products.length !== items.length) {
        throw new Error('Uno o más productos no existen.');
    }
    let subtotal = 0;
    const orderItemsData = [];
    // 2. Validar stock y calcular totales
    for (const item of items) {
        const product = products.find(p => p.id === item.productId);
        if (product.stock < item.quantity) {
            throw new Error(`Stock insuficiente para ${product.name}. Disponible: ${product.stock}`);
        }
        const itemTotal = Number(product.price) * item.quantity;
        subtotal += itemTotal;
        orderItemsData.push({
            productId: product.id,
            quantity: item.quantity,
            unitPrice: product.price,
            unitCost: product.cost, // Guardamos el costo para la gráfica de rentabilidad
        });
    }
    const baseImponible = subtotal / 1.18; // Precio neto antes de impuestos
    const taxAmount = subtotal - baseImponible; // El IGV puro (la diferencia)
    const totalAmount = subtotal + shippingCost; // Total final a pagar
    // --- RADIOGRAFÍA ---
    //console.log("⏳ RECIBIDO EN SERVICE - userId:", userId);
    //console.log("⏳ RECIBIDO EN SERVICE - items:", JSON.stringify(items));
    // --------------------
    // 3. Crear la orden en la BD dentro de una transacción (por si falla algo, no deja datos basura)
    const order = await prisma.$transaction(async (tx) => {
        const newOrder = await tx.order.create({
            data: {
                userId,
                subtotal, // Guardamos el monto con IGV
                taxPercentage: 18,
                taxAmount, // Guardamos el IGV puro desglosado
                shippingCost: shippingCost,
                totalAmount, // Guardamos el total exacto a pagar
                status: 'PAID',
                paymentMethod: 'Tarjeta de crédito',
                items: { create: orderItemsData },
            },
            include: { items: { include: { product: true } } }
        });
        // 4. Descontar el stock de los productos
        for (const item of items) {
            await tx.product.update({
                where: { id: item.productId },
                data: { stock: { decrement: item.quantity } }
            });
        }
        return newOrder;
    });
    return order;
};
exports.createOrderService = createOrderService;
const getOrdersByUserService = async (userId) => {
    return await prisma.order.findMany({
        where: { userId },
        include: {
            items: {
                include: { product: { select: { name: true, price: true } } }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
};
exports.getOrdersByUserService = getOrdersByUserService;
