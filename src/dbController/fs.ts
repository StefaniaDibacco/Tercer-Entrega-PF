import { ProductI, ProductQuery } from '../interfaces/producto';
import { CarritoI } from '../interfaces/carrito';
import fs from 'fs';
import path from 'path';

let _productos: ProductI[] = require('../db/productos');
const _carritos: CarritoI[] = require('../db/carritos');

class DBController {
  async leerP() {
    try {
      return _productos;
    } catch (error) {
      console.log('No hay _productos en el listado');
      return [];
    }
  }

  async leerC(_id: string) {
    try {
      if (!_id) {
        return _carritos;
      }
      const carrito = _carritos.find((c: any) => c._id === _id);
      return carrito;
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

      _productos.push(elemento);
      this.actualizarDBP(_productos);
      return elemento;
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error);
    }
  }

  async guardarC(producto: ProductI, idCarrito: string) {
    try {
      const carrito: any = _carritos.find((c) => c._id === idCarrito);
      carrito.productos.push(producto);
      this.actualizarDBC(_carritos);
      return producto;
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error);
    }
  }

  // Metodo para leer uno
  async leerUnP(_id: any) {
    try {
      const producto = _productos.find((p) => p._id === _id);
      return producto;
    } catch (error) {
      console.log('Producto no encontrado');
    }
  }

  // Metodo para actualizar _productos
  async actualizarP(_id: any, data: ProductQuery) {
    try {
      const index = _productos.map((aProduct) => aProduct._id).indexOf(_id);
      if (index === -1) {
        throw new Error('Producto no encontrado');
      }
      const { nombre, precio, foto, descripcion, codigo, stock } = data;

      _productos[index].nombre = nombre;
      _productos[index].precio = precio;
      _productos[index].foto = foto;
      _productos[index].descripcion = descripcion;
      _productos[index].codigo = codigo;
      _productos[index].stock = stock;

      this.actualizarDBP(_productos);
      return _productos[index];
    } catch (error) {
      console.log(error);
    }
  }

  // Metodo para borrar un producto
  async borrarUnP(_id: any) {
    try {
      const idBuscado = _id;
      const productoEliminado = _productos.find(
        (aProduct) => aProduct._id === idBuscado
      );
      _productos = _productos.filter((aProduct) => aProduct._id !== idBuscado);
      this.actualizarDBP(_productos);
      return productoEliminado;
    } catch (error) {
      console.log(`Producto no encontrado`);
    }
  }

  async borrarUnPdeC(idCarrito: string, _id: any) {
    try {
      const index = _carritos.map((carrito) => carrito._id).indexOf(idCarrito);
      if (index === -1) {
        throw new Error('Carrito no encontrado');
      }
      _carritos[index].productos = _carritos[index].productos.filter(
        (aProduct) => aProduct._id !== _id
      );
      this.actualizarDBC(_carritos);
      return true;
    } catch (error) {
      console.log(`Producto no encontrado`);
    }
  }

  actualizarDBP(data: ProductI[]) {
    fs.writeFileSync(
      path.resolve(__dirname, '../db/productos.json'),
      JSON.stringify(data)
    );
  }

  actualizarDBC(data: CarritoI[]) {
    fs.writeFileSync(
      path.resolve(__dirname, '../db/carritos.json'),
      JSON.stringify(data)
    );
  }
}

export default DBController;
