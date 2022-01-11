const path = require("path");
const { v4: uuidv4 } = require('uuid');

// validar las extensiones
const extensiones = ['png', 'jpg', 'jpeg', 'gif'];

const subirArchivo = ( files, extensionesValidas = extensiones, carpeta = '') => {
    
    const { archivo } = files;
    
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[ nombreCortado.length - 1 ];
    
    return new Promise( ( resolve, reject ) => {

        if( !extensionesValidas.includes( extension ) ) {
    
            return reject(`La extensión ${extension} no es permitida ${ extensionesValidas}`);
        
        }
        
        const nombreTemp = uuidv4() + '.' + extension;
        
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
        
        archivo.mv(uploadPath, ( err ) => {

            if (err) {
                return reject( err );
            }
        
            resolve( nombreTemp );

        });

    });

}

module.exports = {

    subirArchivo

}