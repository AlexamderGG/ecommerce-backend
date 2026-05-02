"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewService = exports.getReviewsByProductService = void 0;
const getReviewsByProductService = async (productId) => {
    return await prisma.review.findMany({
        where: { productId },
        include: {
            user: { select: { name: true } } // Traemos solo el nombre del usuario
        },
        orderBy: { createdAt: 'desc' }
    });
};
exports.getReviewsByProductService = getReviewsByProductService;
const createReviewService = async (userId, productId, rating, comment) => {
    if (rating < 1 || rating > 5)
        throw new Error('La calificación debe ser entre 1 y 5');
    if (!comment.trim())
        throw new Error('El comentario no puede estar vacío');
    return await prisma.review.create({
        data: {
            userId,
            productId,
            rating,
            comment,
        }
    });
};
exports.createReviewService = createReviewService;
