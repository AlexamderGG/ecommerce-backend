import dotenv from 'dotenv';
import app from './app';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Conexión a la base de datos para producción (Evita abrir demasiadas conexiones)
if (!globalThis.prisma) {
  globalThis.prisma = new PrismaClient();
}

const prisma = globalThis.prisma;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});