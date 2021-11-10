import { ProductI } from '../interfaces/producto';
import TipoPersistencia from './dbconfig';
import env from 'dotenv';
env.config();

const DBController = TipoPersistencia.get(process.env.DB_CONFIG);

class Carrito {
  // Metodo para leer productos del carrito
  async leer(_id: string) {
    try {
      const carrito = await DBController.leerC(_id);
      return carrito;
    } catch (error) {
      console.log('No hay productos en el listado');
      return [];
    }
  }

  // Metodo para agregar productos al carrito
  async guardar(producto: ProductI, idCarrito: string) {
    try {
      return await DBController.guardarC(producto, idCarrito);
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error);
      return false;
    }
  }

  // Metodo para borrar productos del carrito
  async borrar(idProducto: string, idCarrito: string) {
    try {
      return await DBController.borrarUnPdeC(idCarrito, idProducto);
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error);
      return false;
    }
  }
}

export const carritoPersistencia = new Carrito();
