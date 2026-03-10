const Personaje = require('../models/personaje.model');
const Tipo = require('../models/tipo.model');

exports.get_add = (request, response, next) => {
    Tipo.fetchAll().then(([rows, fieldData]) => {
        response.render('new', {
            csrfToken: request.csrfToken(),
            username: request.session.username || '',
            tipos: rows,
        });
    }).catch((error) => {next(error)});
};

exports.post_add = (request, response, next) => {
    const personaje = new Personaje(request.body.nombre, 
        request.body.descripcion, request.body.tipo, request.body.imagen);
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
            username: request.session.username || '',
            personajes: rows,
        }); 
    }).catch((error) => {
        next(error);
    });
};