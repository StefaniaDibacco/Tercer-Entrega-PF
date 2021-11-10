import myServer from './services/server';
const puerto = process.env.PORT || 8080;
myServer.listen(puerto, () => console.log(`Server up puerto ${puerto}`));
