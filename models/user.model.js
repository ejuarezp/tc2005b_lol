const db = require('../util/database');
const bcrypt = require('bcrypt');

module.exports = class User {

    constructor(mi_username, mi_nombre, mi_password, mi_correo) {
        this.username = mi_username;
        this.nombre = mi_nombre;
        this.password = mi_password;
        this.correo = mi_correo;
    }

    save() {
        return bcrypt.hash(this.password, 12).then((password_cifrado) => {
            return db.execute(
                "INSERT INTO usuarios(username, nombre, password, correo) VALUES (?, ?, ?, ?)" ,
                [this.username, this.nombre, password_cifrado, this.correo]
            );
        }).catch((error) => {
            console.log(error);
            next(error);
        });
    }
    
    static fetchOne(username) {
        return db.execute("SELECT * FROM usuarios WHERE username = ?", [username]);
    }

}