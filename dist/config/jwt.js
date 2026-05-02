"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = exports.JWT_SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.JWT_SECRET = process.env.JWT_SECRET || 'CLAVE_SECRETA_POR_DEFECTO';
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, exports.JWT_SECRET, { expiresIn: '8h' });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, exports.JWT_SECRET);
};
exports.verifyToken = verifyToken;
