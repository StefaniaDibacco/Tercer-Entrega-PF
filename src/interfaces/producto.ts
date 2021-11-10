export interface ProductI {
  _id?: string;
  timestamp: number | undefined;
  nombre: string | undefined;
  descripcion: string | undefined;
  codigo: string | undefined;
  foto: string | undefined;
  precio: number | undefined;
  stock: number | undefined;
}

export interface newProductI {
  timestamp: number | undefined;
  nombre: string | undefined;
  descripcion: string | undefined;
  codigo: string | undefined;
  foto: string | undefined;
  precio: number | undefined;
  stock: number | undefined;
}

export interface ProductQuery {
  nombre?: string;
  descripcion?: string;
  codigo?: string;
  foto?: string;
  precio?: number;
  stock?: number;
}

export interface ProductClassI {
  leer(_id?: string | undefined): Promise<ProductI[]>;
  guardar(data: newProductI): Promise<ProductI>;
  actualizar(_id: string, newProductData: ProductQuery): Promise<ProductI>;
  borrarUno(_id: string): Promise<void>;
  // query(options: ProductQuery): Promise<ProductI[]>;
}
