import { Request, Response } from 'express';
import { getReviewsByProductService, createReviewService } from './reviews.service';
import { authenticate, AuthRequest } from '../../middlewares/auth.middleware';

export const getReviews = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId as string;
    const reviews = await getReviewsByProductService(productId);
    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user.id;
    const productId = req.params.productId as string;
    const { rating, comment } = req.body;
    
    const review = await createReviewService(userId, productId, rating, comment);
    res.status(201).json(review);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};