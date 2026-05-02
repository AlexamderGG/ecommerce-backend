"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressService = exports.getUserProfileService = void 0;
const database_1 = __importDefault(require("../../config/database"));
// Traer perfil del usuario (para cargar su dirección)
const getUserProfileService = async (userId) => {
    const user = await database_1.default.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, address: true }
    });
    if (!user)
        throw new Error('Usuario no encontrado');
    return user;
};
exports.getUserProfileService = getUserProfileService;
// Actualizar dirección
const updateAddressService = async (userId, address) => {
    return await database_1.default.user.update({
        where: { id: userId },
        data: { address }
    });
};
exports.updateAddressService = updateAddressService;
