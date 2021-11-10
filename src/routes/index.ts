import { Router } from 'express';
import routerProductos from './productos';
import routerCarrito from './carrito';

const router = Router();

router.use('/productos', routerProductos);
router.use('/carrito', routerCarrito);

export default router;
