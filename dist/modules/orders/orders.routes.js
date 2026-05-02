"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = require("./orders.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware"); // <-- NUEVO
const router = (0, express_1.Router)();
// Rutas protegidas: SI O SI necesita un token válido
router.get('/', auth_middleware_1.authenticate, orders_controller_1.getOrders);
router.post('/checkout', auth_middleware_1.authenticate, orders_controller_1.createOrder);
exports.default = router;
