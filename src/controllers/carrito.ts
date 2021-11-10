import { Request, Response, NextFunction } from 'express';
import { carritoPersistencia } from '../persistencia/carrito';

class Carrito {
  checkAddProducts(req: Request, res: Response, next: NextFunction) {
    next();
  }

  checkProductExists(req: Request, res: Response, next: NextFunction) {
    next();
  }

  async getCarrito(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const carrito = await carritoPersistencia.leer(id);
      return res.json({
        data: carrito,
      });
    } catch (error) {
      return res.status(404).json({
        mensaje: error,
      });
    }
  }

  async addProducts(req: Request, res: Response) {
    const { producto } = req.body;
    const idCarrito = req.params.id_carrito;
    try {
      const newItem = await carritoPersistencia.guardar(producto, idCarrito);
      if (newItem) {
        return res.json({
          msg: 'carrito agregado con exito',
          data: producto,
        });
      }
      throw new Error('error al agregar producto');
    } catch (error) {
      return res.status(404).json({
        msg: error,
      });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const idProduct = req.body.id_product;
    const idCarrito = req.params.id_carrito;
    try {
      const borrado = await carritoPersistencia.borrar(idProduct, idCarrito);
      if (borrado) {
        return res.json({
          msg: 'producto borrado del carrito con exito',
        });
      }
      throw new Error('error al borrar producto');
    } catch (error) {
      return res.status(404).json({
        msg: error,
      });
    }
  }
}

export const carritoController = new Carrito();
