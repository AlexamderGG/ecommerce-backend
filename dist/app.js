"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const products_routes_1 = __importDefault(require("./modules/products/products.routes"));
const orders_routes_1 = __importDefault(require("./modules/orders/orders.routes"));
const reports_routes_1 = __importDefault(require("./modules/reports/reports.routes"));
const cart_routes_1 = __importDefault(require("./modules/cart/cart.routes"));
const users_routes_1 = __importDefault(require("./modules/users/users.routes"));
const wishlist_routes_1 = __importDefault(require("./modules/wishlist/wishlist.routes"));
const reviews_routes_1 = __importDefault(require("./modules/reviews/reviews.routes"));
const app = (0, express_1.default)();
// Middlewares globales
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // Para poder leer bodies en formato JSON
// Rutas
app.use('/api/auth', auth_routes_1.default);
app.use('/api/products', products_routes_1.default);
app.use('/api/orders', orders_routes_1.default);
app.use('/api/reports', reports_routes_1.default);
app.use('/api/cart', cart_routes_1.default);
app.use('/api/users', users_routes_1.default);
app.use('/api/wishlist', wishlist_routes_1.default);
app.use('/api/reviews', reviews_routes_1.default);
// Ruta de comprobación
app.get('/api/ping', (req, res) => {
    res.send('Pong! El backend está funcionando 🚀');
});
exports.default = app;
