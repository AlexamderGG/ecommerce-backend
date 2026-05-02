"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reports_controller_1 = require("./reports.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware"); // <-- NUEVO
const router = (0, express_1.Router)();
router.get('/dashboard', reports_controller_1.getDashboard, auth_middleware_1.authenticate);
router.get('/pdf/operational', auth_middleware_1.authenticate, reports_controller_1.downloadOperationalReport); // <--- NUEVA
router.get('/pdf/management', auth_middleware_1.authenticate, reports_controller_1.downloadManagementReport); // <--- NUEVA
exports.default = router;
