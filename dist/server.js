"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
// Conexión a la base de datos para producción (Evita abrir demasiadas conexiones)
if (!globalThis.prisma) {
    globalThis.prisma = new client_1.PrismaClient();
}
const prisma = globalThis.prisma;
app_1.default.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
