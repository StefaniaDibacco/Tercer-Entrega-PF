import { Router } from 'express';
import { carritoController } from '../controllers/carrito';
import { checkUser } from '../middleware/user';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get(
  '/listar/:id?',
  [checkUser, carritoController.checkProductExists],
  asyncHandler(carritoController.getCarrito)
);

router.post(
  '/agregar/:id_carrito',
  [checkUser, carritoController.checkAddProducts],
  asyncHandler(carritoController.addProducts)
);

router.delete(
  '/borrar/:id_carrito',
  [checkUser, carritoController.checkProductExists],
  asyncHandler(carritoController.deleteProduct)
);

export default router;
