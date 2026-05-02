// Borra el import de arriba y usa este en su lugar al principio del archivo:
import { PrismaClient } from '@prisma/client';
declare const prisma: PrismaClient;

export const getDashboardMetrics = async () => {
  // 1. Ventas y Órdenes (Solo las pagadas)
  const orders = await prisma.order.findMany({ where: { status: 'PAID' } });
  const totalSales = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0);
  const totalOrders = orders.length;
  const averageOrder = totalOrders > 0 ? totalSales / totalOrders : 0;

  // 2. Carritos creados y Tasa de Abandono
  const totalCarts = await prisma.cart.count();
  const abandonedCarts = await prisma.cart.count({ where: { isAbandoned: true } });
  const abandonedRate = totalCarts > 0 ? (abandonedCarts / totalCarts) * 100 : 0;
  const conversionRate = totalCarts > 0 ? ((totalOrders / totalCarts) * 100) : 0;

  // 3. Productos con bajo stock (menos de 15 unidades)
  const lowStockCount = await prisma.product.count({ where: { stock: { lt: 15 } } });

  // 4. Reembolsos de 30 días (órdenes canceladas/devueltas)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const refunds = await prisma.order.findMany({
    where: { status: { in: ['CANCELLED', 'REFUNDED'] }, createdAt: { gte: thirtyDaysAgo } }
  });
  const refundAmount = refunds.reduce((sum, o) => sum + Number(o.totalAmount), 0);

  return {
    totalSales,
    totalOrders,
    averageOrder,
    abandonedRate: Math.min(abandonedRate, 100), // Cap a 100%
    conversionRate: Math.min(conversionRate, 100),
    lowStockCount,
    refundCount: refunds.length,
    refundAmount
  };
};

export const getIncomeVsCostData = async () => {
  // Nombres de columnas físicos de PostgreSQL (con guion bajo)
  const data = await prisma.$queryRaw<Array<{ month: string; income: number; cost: number }>>`
    SELECT 
      TO_CHAR(o."created_at", 'YYYY-MM') as month,
      SUM(oi.quantity * oi."unit_price") as income,
      SUM(oi.quantity * oi."unit_cost") as cost
    FROM "order_items" oi
    JOIN "orders" o ON o."id" = oi."order_id"
    WHERE o."status" = 'PAID'
    GROUP BY month
    ORDER BY month DESC
    LIMIT 6
  `;

  // Si no hay compras, devolvemos un array vacío para que Recharts no falle
  if (data.length === 0) return [];

  // Formateamos los nombres de los meses para Recharts
  const formattedData = data.reverse().map(row => {
    const [year, month] = row.month.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    const monthName = date.toLocaleString('es-PE', { month: 'long', year: 'numeric' });
    return {
      name: monthName.charAt(0).toUpperCase() + monthName.slice(1),
      Ingresos: Number(row.income),
      Costos: Number(row.cost),
    };
  });

  return formattedData;
};