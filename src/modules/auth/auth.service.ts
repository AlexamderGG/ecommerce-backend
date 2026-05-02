// Borra el import de arriba y usa este en su lugar al principio del archivo:
import { PrismaClient } from '@prisma/client';
declare const prisma: PrismaClient;
import bcrypt from 'bcryptjs';
import { generateToken } from '../../config/jwt';

export const loginService = async (email: string, password: string) => {
  // 1. Buscar al usuario por email y traer su rol
  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });

  if (!user) {
    throw new Error('Credenciales inválidas'); // No decimos si es el email o la contraseña por seguridad
  }

  // 2. Comparar la contraseña enviada con el hash guardado en la BD
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error('Credenciales inválidas');
  }

  // 3. Generar el Token JWT (Incluimos el ID y el Rol)
  const token = generateToken(user.id, user.roleId);

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

export const registerService = async (name: string, email: string, password: string) => {
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) throw new Error('El correo ya está registrado');

  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Buscamos el rol de CLIENTE
  const clientRole = await prisma.role.findUnique({ where: { name: 'CLIENTE' } });
  if (!clientRole) throw new Error('Error de configuración: Rol CLIENTE no encontrado');

  const newUser = await prisma.user.create({
    data: { name, email, passwordHash: hashedPassword, roleId: clientRole.id },
    select: { id: true, name: true, email: true, role: { select: { name: true } } }
  });

  const token = generateToken(newUser.id, newUser.role.name);
  return { token, user: { ...newUser, roleName: newUser.role.name } };
};