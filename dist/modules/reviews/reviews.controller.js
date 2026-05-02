"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReview = exports.getReviews = void 0;
const reviews_service_1 = require("./reviews.service");
const getReviews = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await (0, reviews_service_1.getReviewsByProductService)(productId);
        res.json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getReviews = getReviews;
const createReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        const { rating, comment } = req.body;
        const review = await (0, reviews_service_1.createReviewService)(userId, productId, rating, comment);
        res.status(201).json(review);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createReview = createReview;
