// Borra el import de arriba y usa este en su lugar al principio del archivo:
import { PrismaClient } from '@prisma/client';
declare const prisma: PrismaClient;

export const getAllProductsService = async (showAll: boolean = false) => {
  return await prisma.product.findMany({
    where: showAll ? {} : { isActive: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const getProductByIdService = async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new Error('Producto no encontrado');
  return product;
};

export const createProductService = async (data: any) => {
  // Para no darte error de Llave Foránea, buscamos la primera categoría y marca disponibles
  const firstCategory = await prisma.category.findFirst();
  const firstBrand = await prisma.brand.findFirst();

  if (!firstCategory || !firstBrand) throw new Error('Necesitas crear al menos una Categoría y una Marca en la BD primero.');

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
export const updateProductStockService = async (id: string, stock: number) => {
  return await prisma.product.update({
    where: { id },
    data: { stock: parseInt(String(stock)) }
  });
};

export const updateProductService = async (id: string, data: any) => {
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

export const deleteProductService = async (id: string) => {
  // En lugar de borrar, lo desactivamos
  return await prisma.product.update({
    where: { id },
    data: { isActive: false }
  });
};
// export const deleteProductService = async (id: string) => {
//   // Borramos el producto. Prisma se encarga de borrar los items relacionados gracias a onDelete: Cascade
//   return await prisma.product.delete({
//     where: { id }
//   });
// };
export const reactivateProductService = async (id: string) => {
  return await prisma.product.update({
    where: { id },
    data: { isActive: true }
  });
};