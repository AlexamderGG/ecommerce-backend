"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadManagementReport = exports.downloadOperationalReport = exports.getDashboard = void 0;
const reports_service_1 = require("./reports.service");
const pdfGenerator_1 = require("./utils/pdfGenerator");
const database_1 = __importDefault(require("../../config/database"));
const getDashboard = async (req, res) => {
    try {
        const metrics = await (0, reports_service_1.getDashboardMetrics)();
        const chartData = await (0, reports_service_1.getIncomeVsCostData)();
        res.json({ metrics, chartData });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getDashboard = getDashboard;
// NUEVO: Descargar Reporte Operacional
const downloadOperationalReport = async (req, res) => {
    try {
        const orders = await database_1.default.order.findMany({
            orderBy: { createdAt: 'desc' },
            take: 50 // Últimas 50 órdenes
        });
        const html = (0, pdfGenerator_1.getOperationalHTML)(orders);
        const { buffer, fileName } = await (0, pdfGenerator_1.generatePDF)(html, 'Reporte_Operacional.pdf');
        // Convertimos a Buffer puro y enviamos con Content-Length exacto
        const pdfBuffer = Buffer.from(buffer);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Length', pdfBuffer.length.toString()); // <--- CLAVE
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.end(pdfBuffer); // Usamos res.end en lugar de res.send
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.downloadOperationalReport = downloadOperationalReport;
// NUEVO: Descargar Reporte de Gestión
const downloadManagementReport = async (req, res) => {
    try {
        const metrics = await (0, reports_service_1.getDashboardMetrics)();
        const chartData = await (0, reports_service_1.getIncomeVsCostData)();
        const html = (0, pdfGenerator_1.getManagementHTML)(metrics, chartData);
        const { buffer, fileName } = await (0, pdfGenerator_1.generatePDF)(html, 'Reporte_Gestion.pdf');
        // Convertimos a Buffer puro y enviamos con Content-Length exacto
        const pdfBuffer = Buffer.from(buffer);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Length', pdfBuffer.length.toString()); // <--- CLAVE
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.end(pdfBuffer); // Usamos res.end en lugar de res.send
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.downloadManagementReport = downloadManagementReport;
