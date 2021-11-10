import { newProductI, ProductQuery } from '../interfaces/producto';
import TipoPersistencia from './dbconfig';
import env from 'dotenv';
env.config();

const DBController = TipoPersistencia.get(process.env.DB_CONFIG);

class Productos {
  // Metodo para leer mis productos
  async leer() {
    try {
      /** leer generico por db elegida con await */
      return await DBController.leerP();
    } catch (error) {
      console.log('No hay productos en el listado');
      return [];
    }
  }

  // Metodo para agregar productos
  async guardar(data: newProductI) {
    try {
      const elemento: newProductI = {
        timestamp: Date.now(),
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        foto: data.foto,
        codigo: data.codigo,
        stock: data.stock,
      };

      return await DBController.guardarP(elemento);
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error);
    }
  }

  // Metodo para leer un producto
  async leerUno(id: string) {
    try {
      const producto = await DBController.leerUnP(id);
      return producto;
    } catch (error) {
      console.log('Producto no encontrado');
    }
  }

  // Metodo para actualizar productos
  async actualizar(id: string, newProductData: ProductQuery) {
    try {
      return await DBController.actualizarP(id, newProductData);
    } catch (error) {
      console.log(error);
    }
  }

  // Metodo para borrar un producto
  async borrarUno(id: string) {
    try {
      return await DBController.borrarUnP(id);
    } catch (error) {
      console.log(`Producto no encontrado`);
    }
  }
}

export const productsPersistencia = new Productos();
