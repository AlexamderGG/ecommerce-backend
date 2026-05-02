// Borra el import de arriba y usa este en su lugar al principio del archivo:
import { PrismaClient } from '@prisma/client';
declare const prisma: PrismaClient;

export const getReviewsByProductService = async (productId: string) => {
  return await prisma.review.findMany({
    where: { productId },
    include: {
      user: { select: { name: true } } // Traemos solo el nombre del usuario
    },
    orderBy: { createdAt: 'desc' }
  });
};

export const createReviewService = async (userId: string, productId: string, rating: number, comment: string) => {
  if (rating < 1 || rating > 5) throw new Error('La calificación debe ser entre 1 y 5');
  if (!comment.trim()) throw new Error('El comentario no puede estar vacío');

  return await prisma.review.create({
    data: {
      userId,
      productId,
      rating,
      comment,
    }
  });
};