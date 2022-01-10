const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConexion } = require('../database/config');


class Servidor{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios'
        }

        // Conectar a la base de datos
        this.conectarDB();

        this.middlewares();
        this.routes();
    }

    async conectarDB() {

        await dbConexion();
            
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

    //rutas de mi app
    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen( this.port, () =>{
            console.log(`App corriendo en http://localhost:${this.port}`);
        })
    }

}

module.exports = Servidor;