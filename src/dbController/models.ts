import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productos = new Schema({
  timestamp: Number,
  nombre: String,
  descripcion: String,
  codigo: String,
  foto: String,
  precio: Number,
  stock: Number,
});

const carritos = new Schema({
  _id: String,
  timestamp: Number,
  productos: Schema.Types.Mixed,
});

export const _productos = mongoose.model('productos', productos);
export const _carritos = mongoose.model('carritos', carritos);
