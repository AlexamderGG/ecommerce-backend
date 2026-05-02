"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("./products.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware"); // <-- NUEVO
const router = (0, express_1.Router)();
router.get('/', products_controller_1.getAllProducts);
router.get('/:id', products_controller_1.getProductById);
router.post('/', products_controller_1.createProduct);
router.put('/:id', products_controller_1.updateProduct, auth_middleware_1.authenticate);
router.patch('/:id/stock', products_controller_1.updateStock);
router.delete('/:id', products_controller_1.deleteProduct, auth_middleware_1.authenticate);
router.patch('/:id/reactivate', products_controller_1.reactivateProduct, auth_middleware_1.authenticate);
exports.default = router;
