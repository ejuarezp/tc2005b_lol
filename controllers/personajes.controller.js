const Personaje = require('../models/personaje.model');

exports.get_add = (request, response, next) => {
    response.render('new', {
        username: request.session.username || '',
    });
};

exports.post_add = (request, response, next) => {
    const personaje = new Personaje(request.body.nombre, 
        request.body.descripcion, request.body.tipo, request.body.imagen);
    personaje.save();
    response.redirect('/personajes');
};

exports.get_old = (request, response, next) => {
    const path = require('path');
    response.sendFile(path.join(__dirname, '..', 'old_labs', 'index.html'));
};

exports.get_list = (request, response, next) => {
    console.log(request.session.username);
    Personaje.fetchAll().then(([rows, fieldData]) => {
        return response.render('list', {
            username: request.session.username || '',
            personajes: rows,
        }); 
    }).catch((error) => {
        next(error);
    });
};