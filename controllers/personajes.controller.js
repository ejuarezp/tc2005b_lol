const Personaje = require('../models/personaje.model');
const Tipo = require('../models/tipo.model');

exports.get_add = (request, response, next) => {
    Tipo.fetchAll().then(([rows, fieldData]) => {
        response.render('new', {
            edit: false,
            csrfToken: request.csrfToken(),
            username: request.session.username || '',
            tipos: rows,
        });
    }).catch((error) => {next(error)});
};

exports.post_add = (request, response, next) => {
    console.log(request.file);
    const personaje = new Personaje(request.body.nombre, 
        request.body.descripcion, request.body.tipo, request.file.filename);
    personaje.save().then(() => {
        return response.redirect('/personajes');
    }).catch((error) => {next(error)});
};

exports.get_old = (request, response, next) => {
    const path = require('path');
    response.sendFile(path.join(__dirname, '..', 'old_labs', 'index.html'));
};

exports.get_list = (request, response, next) => {
    console.log(request.session.permisos);
    Personaje.fetch(request.params.personaje_id).then(([rows, fieldData]) => {
        return response.render('list', {
            permisos: request.session.permisos || [],
            username: request.session.username || '',
            personajes: rows,
        }); 
    }).catch((error) => {
        next(error);
    });
};

exports.get_buscar = (request, response, next) => {
    response.status(200).json({message: "Respuesta asíncrona"});
}

exports.get_edit = (request, response, next) => {
    Personaje.fetchOne(request.params.personaje_id).then(([personaje, fielData]) => {
        console.log(personaje[0]);
        Tipo.fetchAll().then(([rows, fieldData]) => {
            response.render('new', {
                edit: true,
                personaje: personaje[0],
                csrfToken: request.csrfToken(),
                username: request.session.username || '',
                tipos: rows,
            });
        }).catch((error) => {next(error)});
    }).catch((error) => {next(error)});
};

exports.post_edit = (request, response, next) => {
    Personaje.edit(request.body.id, request.body.nombre, request.body.descripcion, 
        request.body.tipo, request.body.imagen).then(() => {
        return response.redirect('/personajes');
    }).catch((error) => {next(error)});
};