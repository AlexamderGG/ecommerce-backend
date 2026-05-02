"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/profile', auth_middleware_1.authenticate, users_controller_1.getProfile);
router.put('/address', auth_middleware_1.authenticate, users_controller_1.updateAddress);
exports.default = router;
