import { Router } from 'express';
import { productController } from '../controllers/productos';
import { checkAdmin } from '../middleware/admin';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get('/', asyncHandler(productController.getProducts));

router.get(
  '/listar/:id?',
  productController.checkProductExists,
  asyncHandler(productController.getProducts)
);

router.post(
  '/agregar',
  [checkAdmin, productController.checkAddProducts],
  asyncHandler(productController.addProducts)
);

router.put(
  '/actualizar/:id',
  [checkAdmin, productController.checkProductExists],
  asyncHandler(productController.updateProducts)
);

router.delete(
  '/borrar/:id',
  [checkAdmin, productController.checkProductExists],
  asyncHandler(productController.deleteProducts)
);

export default router;
