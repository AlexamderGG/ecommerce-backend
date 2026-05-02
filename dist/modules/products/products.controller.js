"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactivateProduct = exports.deleteProduct = exports.updateProduct = exports.updateStock = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const products_service_1 = require("./products.service");
const getAllProducts = async (req, res) => {
    try {
        const showAll = req.query.showAll === 'true';
        // Llamamos al SERVICIO, no a prisma
        const products = await (0, products_service_1.getAllProductsService)(showAll);
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await (0, products_service_1.getProductByIdService)(id);
        res.json(product);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const product = await (0, products_service_1.createProductService)(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createProduct = createProduct;
const updateStock = async (req, res) => {
    try {
        const id = req.params.id;
        const { stock } = req.body;
        const product = await (0, products_service_1.updateProductStockService)(id, stock);
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateStock = updateStock;
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await (0, products_service_1.updateProductService)(id, req.body);
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await (0, products_service_1.deleteProductService)(id);
        res.json({ message: 'Producto eliminado correctamente' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteProduct = deleteProduct;
const reactivateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await (0, products_service_1.reactivateProductService)(id);
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.reactivateProduct = reactivateProduct;
