// Borra el import de arriba y usa este en su lugar al principio del archivo:
import { PrismaClient } from '@prisma/client';
declare const prisma: PrismaClient;

export const getWishlistService = async (userId: string) => {
  return await prisma.wishlist.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: 'desc' }
  });
};

export const toggleWishlistService = async (userId: string, productId: string) => {
  // Buscamos si ya existe en la lista de deseos
  const existing = await prisma.wishlist.findUnique({
    where: { userId_productId: { userId, productId } }
  });

  if (existing) {
    // Si existe, lo borramos
    await prisma.wishlist.delete({ where: { id: existing.id } });
    return { action: 'removed' };
  } else {
    // Si no existe, lo añadimos
    await prisma.wishlist.create({ data: { userId, productId } });
    return { action: 'added' };
  }
};