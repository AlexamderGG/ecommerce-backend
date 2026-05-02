"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Sembrando base de datos...');
    // 1. Roles
    const adminRole = await prisma.role.upsert({ where: { name: client_1.RoleName.ADMIN }, update: {}, create: { name: client_1.RoleName.ADMIN } });
    await prisma.role.upsert({ where: { name: client_1.RoleName.GERENTE }, update: {}, create: { name: client_1.RoleName.GERENTE } });
    await prisma.role.upsert({ where: { name: client_1.RoleName.CLIENTE }, update: {}, create: { name: client_1.RoleName.CLIENTE } });
    // 2. Admin
    const hashedPassword = await bcryptjs_1.default.hash('admin123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@tienda.com' },
        update: {},
        create: { name: 'Administrador', email: 'admin@tienda.com', passwordHash: hashedPassword, roleId: adminRole.id },
    });
    // 3. Categorías y Marcas
    const catTecno = await prisma.category.create({ data: { name: 'Tecnología' } });
    const catHogar = await prisma.category.create({ data: { name: 'Hogar' } });
    const catCafe = await prisma.category.create({ data: { name: 'Alimentos' } });
    const brandGen = await prisma.brand.create({ data: { name: 'Genérico' } });
    const brandPro = await prisma.brand.create({ data: { name: 'ProTech' } });
    // 4. Productos (Usando upsert por si ejecutas el seed varias veces no duplicar)
    await prisma.product.upsert({
        where: { sku: 'SKU1020' },
        update: {},
        create: { name: 'Café Gourmet', sku: 'SKU1020', price: 12.99, cost: 5.00, stock: 34, tags: ['Tostado medio'], categoryId: catCafe.id, brandId: brandGen.id }
    });
    await prisma.product.upsert({
        where: { sku: 'SKU1011' },
        update: {},
        create: { name: 'Smartwatch Pro', sku: 'SKU1011', price: 199.99, cost: 80.00, stock: 12, tags: ['Wearables'], categoryId: catTecno.id, brandId: brandPro.id }
    });
    await prisma.product.upsert({
        where: { sku: 'SKU1017' },
        update: {},
        create: { name: 'Lámpara LED', sku: 'SKU1017', price: 34.99, cost: 12.00, stock: 50, tags: ['Iluminación'], categoryId: catHogar.id, brandId: brandGen.id }
    });
    await prisma.product.upsert({
        where: { sku: 'SKU1018' },
        update: {},
        create: { name: 'Celular X100', sku: 'SKU1018', price: 500.00, cost: 250.00, stock: 10, tags: ['Smartphone'], categoryId: catTecno.id, brandId: brandPro.id }
    });
    await prisma.product.upsert({
        where: { sku: 'SKU1019' },
        update: {},
        create: { name: 'Auriculares BT', sku: 'SKU1019', price: 89.99, cost: 30.00, stock: 25, tags: ['Audio'], categoryId: catTecno.id, brandId: brandGen.id }
    });
    console.log('✅ Base de datos llenada con éxito (Roles, Admin, Productos)');
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
