"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactivateProductService = exports.deleteProductService = exports.updateProductService = exports.updateProductStockService = exports.createProductService = exports.getProductByIdService = exports.getAllProductsService = void 0;
const getAllProductsService = async (showAll = false) => {
    return await prisma.product.findMany({
        where: showAll ? {} : { isActive: true },
        orderBy: { createdAt: 'desc' },
    });
};
exports.getAllProductsService = getAllProductsService;
const getProductByIdService = async (id) => {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product)
        throw new Error('Producto no encontrado');
    return product;
};
exports.getProductByIdService = getProductByIdService;
const createProductService = async (data) => {
    // Para no darte error de Llave Foránea, buscamos la primera categoría y marca disponibles
    const firstCategory = await prisma.category.findFirst();
    const firstBrand = await prisma.brand.findFirst();
    if (!firstCategory || !firstBrand)
        throw new Error('Necesitas crear al menos una Categoría y una Marca en la BD primero.');
    return await prisma.product.create({
        data: {
            name: data.name,
            sku: data.sku,
            price: parseFloat(data.price),
            cost: parseFloat(data.cost),
            stock: parseInt(data.stock),
            tags: data.tags ? data.tags.split(',') : [],
            imageUrl: data.imageUrl || null,
            categoryId: firstCategory.id,
            brandId: firstBrand.id,
        }
    });
};
exports.createProductService = createProductService;
const updateProductStockService = async (id, stock) => {
    return await prisma.product.update({
        where: { id },
        data: { stock: parseInt(String(stock)) }
    });
};
exports.updateProductStockService = updateProductStockService;
const updateProductService = async (id, data) => {
    return await prisma.product.update({
        where: { id },
        data: {
            name: data.name,
            sku: data.sku,
            price: parseFloat(data.price),
            cost: parseFloat(data.cost),
            stock: parseInt(data.stock),
            tags: data.tags ? data.tags.split(',') : [],
            imageUrl: data.imageUrl || null,
        }
    });
};
exports.updateProductService = updateProductService;
const deleteProductService = async (id) => {
    // En lugar de borrar, lo desactivamos
    return await prisma.product.update({
        where: { id },
        data: { isActive: false }
    });
};
exports.deleteProductService = deleteProductService;
// export const deleteProductService = async (id: string) => {
//   // Borramos el producto. Prisma se encarga de borrar los items relacionados gracias a onDelete: Cascade
//   return await prisma.product.delete({
//     where: { id }
//   });
// };
const reactivateProductService = async (id) => {
    return await prisma.product.update({
        where: { id },
        data: { isActive: true }
    });
};
exports.reactivateProductService = reactivateProductService;
