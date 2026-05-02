"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlist_controller_1 = require("./wishlist.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.authenticate, wishlist_controller_1.getWishlist);
router.post('/:productId', auth_middleware_1.authenticate, wishlist_controller_1.toggleWishlist); // POST para añadir/eliminar (Toggle)
exports.default = router;
