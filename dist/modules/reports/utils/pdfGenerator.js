"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManagementHTML = exports.getOperationalHTML = exports.generatePDF = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
// Función genérica para convertir HTML a PDF
const generatePDF = async (htmlContent, fileName) => {
    const browser = await puppeteer_1.default.launch({ headless: true }); // headless: 'new' es más rápido
    const page = await browser.newPage();
    // Cargamos el HTML
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    // Generamos el PDF con configuración de página
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
    });
    await browser.close();
    // Retornamos el buffer del PDF y sugerimos el nombre del archivo
    return { buffer: pdfBuffer, fileName };
};
exports.generatePDF = generatePDF;
// --- PLANTILLAS HTML ---
const getOperationalHTML = (orders) => {
    const rows = orders.map(o => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${o.id.substring(0, 8)}...</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${new Date(o.createdAt).toLocaleDateString('es-PE')}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">S/ ${Number(o.totalAmount).toFixed(2)}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;"><span style="background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${o.status}</span></td>
    </tr>
  `).join('');
    return `
    <div style="font-family: Arial, sans-serif; color: #1e293b;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; margin-bottom: 20px;">
        <h1 style="margin: 0; color: #4f46e5;">Tienda Demo Suite</h1>
        <p style="margin: 0; color: #64748b; font-size: 14px;">Reporte Operacional Diario</p>
      </div>
      <p style="font-size: 14px; color: #64748b; margin-bottom: 20px;">Generado el: ${new Date().toLocaleString('es-PE')}</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <thead style="background-color: #f1f5f9;">
          <tr>
            <th style="padding: 10px; text-align: left;">Orden ID</th>
            <th style="padding: 10px; text-align: left;">Fecha</th>
            <th style="padding: 10px; text-align: right;">Monto Total</th>
            <th style="padding: 10px; text-align: center;">Estado</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div style="margin-top: 30px; text-align: right; font-size: 12px; color: #94a3b8;">
        Documento generado automáticamente por el sistema.
      </div>
    </div>
  `;
};
exports.getOperationalHTML = getOperationalHTML;
const getManagementHTML = (data, chartData) => {
    const rows = chartData.map(c => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${c.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right; color: #16a34a;">S/ ${Number(c.Ingresos).toFixed(2)}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right; color: #dc2626;">S/ ${Number(c.Costos).toFixed(2)}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right; font-weight: bold;">S/ ${(Number(c.Ingresos) - Number(c.Costos)).toFixed(2)}</td>
    </tr>
  `).join('');
    return `
    <div style="font-family: Arial, sans-serif; color: #1e293b;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; margin-bottom: 20px;">
        <h1 style="margin: 0; color: #4f46e5;">Tienda Demo Suite</h1>
        <p style="margin: 0; color: #64748b; font-size: 14px;">Reporte de Gestión (Rentabilidad)</p>
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; width: 30%;">
          <p style="margin: 0; font-size: 12px; color: #64748b;">Ventas Totales</p>
          <p style="margin: 5px 0 0; font-size: 24px; font-weight: bold;">S/ ${Number(data.totalSales).toFixed(2)}</p>
        </div>
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; width: 30%;">
          <p style="margin: 0; font-size: 12px; color: #64748b;">Tasa de Conversión</p>
          <p style="margin: 5px 0 0; font-size: 24px; font-weight: bold;">${data.conversionRate.toFixed(1)}%</p>
        </div>
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; width: 30%;">
          <p style="margin: 0; font-size: 12px; color: #64748b;">Reembolsos (30d)</p>
          <p style="margin: 5px 0 0; font-size: 24px; font-weight: bold; color: #dc2626;">S/ ${Number(data.refundAmount).toFixed(2)}</p>
        </div>
      </div>

      <h3 style="margin-bottom: 10px;">Desglose por Mes</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <thead style="background-color: #f1f5f9;">
          <tr>
            <th style="padding: 10px; text-align: left;">Periodo</th>
            <th style="padding: 10px; text-align: right;">Ingresos</th>
            <th style="padding: 10px; text-align: right;">Costos</th>
            <th style="padding: 10px; text-align: right;">Ganancia Neta</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
};
exports.getManagementHTML = getManagementHTML;
