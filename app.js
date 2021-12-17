const Servidor = require("./models/server");

const servidor = new Servidor();

servidor.listen();


//middleware-cors sirve para que ciertas paginas puedan acceder a nuestro restserver
//protege nuestro servidor
//recibir informacion con el metodo post