"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerService = exports.loginService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../../config/jwt");
const loginService = async (email, password) => {
    // 1. Buscar al usuario por email y traer su rol
    const user = await prisma.user.findUnique({
        where: { email },
        include: { role: true },
    });
    if (!user) {
        throw new Error('Credenciales inválidas'); // No decimos si es el email o la contraseña por seguridad
    }
    // 2. Comparar la contraseña enviada con el hash guardado en la BD
    const isMatch = await bcryptjs_1.default.compare(password, user.passwordHash);
    if (!isMatch) {
        throw new Error('Credenciales inválidas');
    }
    // 3. Generar el Token JWT (Incluimos el ID y el Rol)
    const token = (0, jwt_1.generateToken)(user.id, user.roleId);
    // 4. Retornar la info que necesita el frontend (sin la contraseña)
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            roleName: user.role.name,
        },
    };
};
exports.loginService = loginService;
const registerService = async (name, email, password) => {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists)
        throw new Error('El correo ya está registrado');
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    // Buscamos el rol de CLIENTE
    const clientRole = await prisma.role.findUnique({ where: { name: 'CLIENTE' } });
    if (!clientRole)
        throw new Error('Error de configuración: Rol CLIENTE no encontrado');
    const newUser = await prisma.user.create({
        data: { name, email, passwordHash: hashedPassword, roleId: clientRole.id },
        select: { id: true, name: true, email: true, role: { select: { name: true } } }
    });
    const token = (0, jwt_1.generateToken)(newUser.id, newUser.role.name);
    return { token, user: { ...newUser, roleName: newUser.role.name } };
};
exports.registerService = registerService;
