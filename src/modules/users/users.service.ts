// Borra el import de arriba y usa este en su lugar al principio del archivo:
import { PrismaClient } from '@prisma/client';
declare const prisma: PrismaClient;

// Traer perfil del usuario (para cargar su dirección)
export const getUserProfileService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, address: true }
  });
  if (!user) throw new Error('Usuario no encontrado');
  return user;
};

// Actualizar dirección
export const updateAddressService = async (userId: string, address: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { address }
  });
};