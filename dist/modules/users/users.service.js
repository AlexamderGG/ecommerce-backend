"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressService = exports.getUserProfileService = void 0;
// Traer perfil del usuario (para cargar su dirección)
const getUserProfileService = async (userId) => {
    const user = await prisma.user.findUnique({
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
    return await prisma.user.update({
        where: { id: userId },
        data: { address }
    });
};
exports.updateAddressService = updateAddressService;
