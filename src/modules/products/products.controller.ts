import { Request, Response } from 'express';
import { getAllProductsService, getProductByIdService, createProductService, updateProductService, updateProductStockService, deleteProductService, reactivateProductService } from './products.service';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const showAll = req.query.showAll === 'true';
    // Llamamos al SERVICIO, no a prisma
    const products = await getAllProductsService(showAll); 
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await getProductByIdService(id);
    res.json(product);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await createProductService(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStock = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { stock } = req.body;
    const product = await updateProductStockService(id, stock);
    res.json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await updateProductService(id, req.body);
    res.json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await deleteProductService(id);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const reactivateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await reactivateProductService(id);
    res.json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};