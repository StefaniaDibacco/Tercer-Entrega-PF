import admin, { ServiceAccount } from 'firebase-admin';
import { ProductI, ProductQuery } from '../interfaces/producto';
import serviceAccount from './../../firebase.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

const db = admin.firestore();

const _productos = db.collection('productos');
const _carritos = db.collection('carritos');

class DBController {
  async leerP() {
    const resultado = await _productos.get();
    const docs = resultado.docs;
    const output = docs.map((aDoc) => ({
      id: aDoc.id,
      data: aDoc.data(),
    }));

    return output;
  }

  async leerUnP(_id: string) {
    const result = await _productos.doc(_id).get();
    return {
      id: result.id,
      data: result.data(),
    };
  }

  async leerC(_id: string) {
    const result = await _carritos.doc(_id).get();
    return {
      id: result.id,
      data: result.data(),
    };
  }

  async guardarP(data: ProductI) {
    try {
      const UserDocument = _productos.doc();
      await UserDocument.create(data);
    } catch (err) {
      console.log('ERROR');
      console.log(err);
    }
  }

  async guardarC(producto: ProductI, idCarrito: string) {
    const result = await _carritos.doc(idCarrito).set({ ...producto });
    return result;
  }

  async actualizarP(_id: string, data: ProductQuery) {
    await _productos.doc(_id).update(data);
    return this.leerUnP(_id);
  }

  async borrarUnP(_id: string) {
    await _productos.doc(_id).delete();
  }
}

export default DBController;
