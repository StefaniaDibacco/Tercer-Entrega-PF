import mongoose from 'mongoose';
import { ProductI, ProductQuery } from '../interfaces/producto';
import { _carritos, _productos } from './models';
class DBController {
  constructor() {
    mongoose.connect('mongodb://localhost:27017/ecommerce');
  }

  async leerP() {
    try {
      return await _productos.find({});
    } catch (error) {
      console.log('No hay _productos en el listado');
      return [];
    }
  }

  async leerC(_id: string) {
    try {
      return await _carritos.find({ _id });
    } catch (error) {
      console.log('No hay _productos en el listado');
      return [];
    }
  }

  // Metodo para agregar _productos
  async guardarP(data: ProductI) {
    const { timestamp, nombre, descripcion, codigo, foto, precio, stock } =
      data;
    try {
      const elemento: ProductI = {
        timestamp: timestamp,
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock,
      };

      // elementos.push(elemento);
      const nuevoPoducto = new _productos(elemento);
      return await nuevoPoducto.save();
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error);
    }
  }

  async guardarC(producto: ProductI, idCarrito: string) {
    try {
      const carrito: any = await _carritos.find({ _id: idCarrito });
      carrito.productos.push(producto);
      const result = await _carritos.updateOne(
        { _id: idCarrito },
        { $set: { productos: carrito.productos } }
      );
      return result;
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error);
    }
  }

  // Metodo para leer uno
  async leerUnP(_id: any) {
    try {
      const producto = await _productos.findOne({ _id: _id });
      return producto;
    } catch (error) {
      console.log('Producto no encontrado');
    }
  }

  // Metodo para actualizar _productos
  async actualizarP(_id: any, data: ProductQuery) {
    try {
      return await _productos.updateOne({ _id: _id }, { $set: data });
    } catch (error) {
      console.log(error);
    }
  }

  // Metodo para borrar un producto
  async borrarUnP(_id: any) {
    try {
      return await _productos.deleteOne({ _id: _id });
    } catch (error) {
      console.log(`Producto no encontrado`);
    }
  }

  async borrarUnPdeC(idCarrito: string, _id: any) {
    try {
      const carrito: any = await _carritos.find({ _id: idCarrito });
      const productos = carrito.productos.filter(
        (p: { _id: any }) => p._id !== _id
      );
      const result = await _carritos.updateOne(
        { _id: idCarrito },
        { $set: { productos: productos } }
      );
      return result;
    } catch (error) {
      console.log(`Producto no encontrado`);
    }
  }
}

export default DBController;
