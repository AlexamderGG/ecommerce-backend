import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes';
import productRoutes from './modules/products/products.routes'; 
import orderRoutes from './modules/orders/orders.routes';
import reportsRoutes from './modules/reports/reports.routes';
import cartRoutes from './modules/cart/cart.routes';
import userRoutes from './modules/users/users.routes';
import wishlistRoutes from './modules/wishlist/wishlist.routes';
import reviewsRoutes from './modules/reviews/reviews.routes';



const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json()); // Para poder leer bodies en formato JSON

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/orders', orderRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewsRoutes);


// Ruta de comprobación
app.get('/api/ping', (req, res) => {
  res.send('Pong! El backend está funcionando 🚀');
});

export default app;