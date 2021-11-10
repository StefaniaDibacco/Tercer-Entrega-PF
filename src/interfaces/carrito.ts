import { ProductI } from './producto';

export interface CarritoI {
  _id: string;
  timestamp: number;
  productos: ProductI[];
}

export interface CarritoClassI {
  leer(id?: string | undefined): Promise<CarritoI[]>;
  guardar(data: ProductI, idCarrito: string): Promise<CarritoI>;
  borrar(idProducto: string, idCarrito: string): Promise<void>;
}
