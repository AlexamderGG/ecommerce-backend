"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviews_controller_1 = require("./reviews.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Público: Todos pueden ver las reseñas
router.get('/:productId', reviews_controller_1.getReviews);
// Privado: Solo logueados pueden crear
router.post('/:productId', auth_middleware_1.authenticate, reviews_controller_1.createReview);
exports.default = router;
