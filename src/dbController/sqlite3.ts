import knex from 'knex';
import { ProductI, ProductQuery } from '../interfaces/producto';
export const sqliteDB = knex({
  client: 'sqlite3',
  connection: { filename: './src/db/ecommerce.sqlite' },
  useNullAsDefault: true,
});

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

sqliteDB.schema.hasTable('carritos').then((exists) => {
  if (!exists) {
    console.log('NO EXISTE LA TABLA carritos.');
    sqliteDB.schema
      .createTable('carritos', (tabla) => {
        tabla.string('_id');
        tabla.string('timestamp');
        tabla.specificType('productos', 'object ARRAY');
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
      return await _carritos.where({ _id }).select();
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
      const carrito: any = await _carritos.where({ _id: idCarrito }).select();
      carrito.productos.push(producto);
      const result = await _carritos
        .where({ _id: idCarrito })
        .update({ productos: carrito.productos });
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
      const carrito: any = await _carritos.where({ _id: idCarrito }).select();
      const productos = carrito.productos.filter(
        (p: { _id: any }) => p._id !== _id
      );
      const result = await _carritos
        .where({ _id: idCarrito })
        .update({ productos: productos });
      return result;
    } catch (error) {
      console.log(`Producto no encontrado`);
    }
  }
}

export default DBController;
