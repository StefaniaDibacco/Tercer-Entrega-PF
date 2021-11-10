import { Request, Response, NextFunction } from 'express';
import { productsPersistencia } from '../persistencia/productos';

class Producto {
  checkAddProducts(req: Request, res: Response, next: NextFunction) {
    next();
  }

  async checkProductExists(req: Request, res: Response, next: NextFunction) {
    if (req.params.id) {
      const id = req.params.id;

      const producto = await productsPersistencia.leerUno(id);

      if (!producto) {
        return res.status(404).json({
          msg: 'producto not found',
        });
      }
    }
    next();
  }

  async getProducts(req: Request, res: Response) {
    const id = req.params.id;

    const producto = id
      ? await productsPersistencia.leerUno(id)
      : await productsPersistencia.leer();

    res.json({
      data: producto,
    });
  }

  async addProducts(req: Request, res: Response) {
    const newItem = await productsPersistencia.guardar(req.body);

    res.json({
      msg: 'producto agregado con exito',
      data: newItem,
    });
  }

  async updateProducts(req: Request, res: Response) {
    const id = req.params.id;
    const newItem = await productsPersistencia.actualizar(id, req.body);
    res.json({
      data: newItem,
      msg: 'actualizando producto',
    });
  }

  async deleteProducts(req: Request, res: Response) {
    const id = req.params.id;
    await productsPersistencia.borrarUno(id);
    res.json({
      msg: 'producto borrado',
    });
  }
}

export const productController = new Producto();
