import { Request, Response } from 'express';
import { getDashboardMetrics, getIncomeVsCostData } from './reports.service';
import { generatePDF, getOperationalHTML, getManagementHTML } from './utils/pdfGenerator';
import prisma from '../../config/database';

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const metrics = await getDashboardMetrics();
    const chartData = await getIncomeVsCostData();
    res.json({ metrics, chartData });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// NUEVO: Descargar Reporte Operacional
export const downloadOperationalReport = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50 // Últimas 50 órdenes
    });
    const html = getOperationalHTML(orders);
    const { buffer, fileName } = await generatePDF(html, 'Reporte_Operacional.pdf');
    
    // Convertimos a Buffer puro y enviamos con Content-Length exacto
    const pdfBuffer = Buffer.from(buffer);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', pdfBuffer.length.toString()); // <--- CLAVE
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.end(pdfBuffer); // Usamos res.end en lugar de res.send
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// NUEVO: Descargar Reporte de Gestión
export const downloadManagementReport = async (req: Request, res: Response) => {
  try {
    const metrics = await getDashboardMetrics();
    const chartData = await getIncomeVsCostData();
    const html = getManagementHTML(metrics, chartData);
    const { buffer, fileName } = await generatePDF(html, 'Reporte_Gestion.pdf');
    
    // Convertimos a Buffer puro y enviamos con Content-Length exacto
    const pdfBuffer = Buffer.from(buffer);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', pdfBuffer.length.toString()); // <--- CLAVE
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.end(pdfBuffer); // Usamos res.end en lugar de res.send
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};