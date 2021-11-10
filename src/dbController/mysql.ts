import knex from 'knex';
import { ProductI, ProductQuery } from '../interfaces/producto';

export const mySQLDB = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'ecommerce',
  },
  pool: { min: 0, max: 2 },
});

mySQLDB.schema.hasTable('carritos').then((exists) => {
  if (!exists) {
    console.log('NO EXISTE LA TABLA carritos.');
    mySQLDB.schema
      .createTable('carritos', (tabla) => {
        tabla.string('_id');
        tabla.string('timestamp');
        tabla.string('id_producto');
      })
      .then(() => {
        console.log('DONE');
      });
  }
});

mySQLDB.schema.hasTable('productos').then((exists) => {
  if (!exists) {
    console.log('NO EXISTE LA TABLA productos.');
    mySQLDB.schema
      .createTable('productos', (productosTable) => {
        productosTable.string('_id');
        productosTable.string('nombre');
        productosTable.string('descripcion');
        productosTable.string('codigo');
        productosTable.integer('stock');
        productosTable.string('foto');
        productosTable.decimal('precio', 4, 2);
        productosTable.integer('timestamp');
      })
      .then(() => {
        console.log('DONE');
      });
  }
});

const _productos = mySQLDB.from('productos');
const _carritos = mySQLDB.from('carritos');

class DBController {
  async leerP() {
    try {
      return await _productos.select();
    } catch (error) {
      console.log('No hay _productos en el listado');
      return [];
    }
  }

  async leerC(_id: string) {
    try {
      const result = await _carritos
        .where({ _id })
        .select()
        .orderBy('_id', 'desc');
      const productosIds = result.map((r) => r.id_producto);
      const productos = _productos.where({ _id: productosIds }).select();
      return {
        _id,
        timestamp: Date.now(),
        productos,
      };
    } catch (error) {
      console.log('No hay _productos en el listado');
      return [];
    }
  }

  // Metodo para agregar _productos
  async guardarP(data: ProductI) {
    try {
      const { timestamp, nombre, descripcion, codigo, foto, precio, stock } =
        data;

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

      return await _productos.insert(elemento);
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error);
    }
  }

  async guardarC(producto: ProductI, idCarrito: string) {
    try {
      // const carrito: any = await _carritos.where({ _id: idCarrito }).select();
      // carrito.productos.push(producto);
      const data = {
        _id: idCarrito,
        timestamp: Date.now(),
        id_producto: producto._id,
      };
      const result = await _carritos.insert(data);
      // .where({ _id: idCarrito })
      // .update({ productos: carrito.productos });
      return result;
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error);
    }
  }

  // Metodo para leer uno
  async leerUnP(_id: any) {
    try {
      const producto = await _productos.where({ _id: _id }).select();
      return producto;
    } catch (error) {
      console.log('Producto no encontrado');
    }
  }

  // Metodo para actualizar _productos
  async actualizarP(_id: any, data: ProductQuery) {
    try {
      return await _productos.where({ _id: _id }).update(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Metodo para borrar un producto
  async borrarUnP(_id: any) {
    try {
      return await _productos.where({ _id: _id }).del();
    } catch (error) {
      console.log(`Producto no encontrado`);
    }
  }

  async borrarUnPdeC(idCarrito: string, _id: any) {
    try {
      // const carrito: any = await _carritos.where({ _id: idCarrito }).select();
      // const productos = carrito.productos.filter(
      // (p: { _id: any }) => p._id !== _id
      // );
      // const result = await _carritos
      // .where({ _id: idCarrito })
      // .update({ productos: productos });
      const result = await _carritos
        .where({ _id: idCarrito, id_producto: _id })
        .del();
      return result;
    } catch (error) {
      console.log(`Producto no encontrado`);
    }
  }
}

export default DBController;
