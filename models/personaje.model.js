const db = require('../util/database');

module.exports = class Personaje {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_nombre, mi_descripcion, mi_tipo,  mi_imagen) {
        this.nombre = mi_nombre;
        this.descripcion = mi_descripcion;
        this.tipo = mi_tipo;
        this.imagen = mi_imagen;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(
            'INSERT INTO personajes(nombre, descripcion, tipo_id, imagen) values (?, ?, ?, ?)', 
            [this.nombre, this.descripcion, this.tipo, this.imagen]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM personajes');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM personajes WHERE id = ?', [id]);
    }

    static fetch(id) {
        if (id) {
            return this.fetchOne(id);
        } else {
            return this.fetchAll();
        }
    }

    static edit(id, nombre, descripcion, tipo, imagen) {
        return db.execute(
            "UPDATE personajes SET nombre=?, descripcion=?, tipo_id=?, imagen=? WHERE id=?", 
            [nombre, descripcion, tipo, imagen, id]
        );
    }

    static buscar(busqueda) {
        return db.execute(`
            SELECT p.id, nombre, descripcion, tipo, imagen  
            FROM personajes p, tipo t
            WHERE p.tipo_id = t.id AND (nombre LIKE ? OR descripcion LIKE ? OR tipo LIKE ?)
            `, ['%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%']);
    }

}