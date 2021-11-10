import Firebase from './../dbController/firebase';
import Fs from './../dbController/fs';
import Mongo from './../dbController/mongo';
import MongoDBass from './../dbController/mongoDBass';
import MySQL from './../dbController/mysql';
import SqLite3 from './../dbController/sqlite3';

export default class TipoPersistencia {
  static get(tipo: string | undefined) {
    switch (tipo) {
      case 'fs':
        return new Fs();
      /*  case 'firebase':
        return new Firebase();
      case 'mongo':
        return new Mongo();
      case 'mongoDBass':
        return new MongoDBass();
      case 'mySQL':
        return new MySQL();
      case 'sqLite3':
        return new SqLite3(); */
      default:
        return new Fs();
    }
  }
}
