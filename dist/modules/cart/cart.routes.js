"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("./cart.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.authenticate, cart_controller_1.getCart);
router.post('/sync', auth_middleware_1.authenticate, cart_controller_1.syncCart);
exports.default = router;
