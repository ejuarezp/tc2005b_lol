const User = require("../models/user.model");
const bcrypt = require('bcrypt');

exports.get_login = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('login', {
        csrfToken: request.csrfToken(),
        error: error,
        username: request.session.username || '',
    }); 
};

exports.post_login = (request, response, next) => {
    User.fetchOne(request.body.username).then(([usuarios, fieldData]) => {
        if (usuarios.length > 0) {
            bcrypt.compare(request.body.password, usuarios[0].password).then((doMatch) => {
                if(doMatch) {
                    request.session.isLoggedIn = true;
                    request.session.username = request.body.username;
                    User.getPermisos(request.body.username).then(([permisos, fieldData]) => {
                        request.session.permisos = permisos;
                        return request.session.save(() => {
                            return response.redirect('/personajes');
                        }); 
                    }).catch((error) => {
                        console.log(error);
                        next(error);
                    });
                } else {
                    request.session.error = "Usario y/o contraseña no coinciden";
                    return response.redirect('/users/login');
                }
            }).catch((error) => {
                console.log(error);
                next(error);
            });
        } else {
            request.session.error = "Usario y/o contraseña no coinciden";
            return response.redirect('/users/login');
        }
    }).catch((error) => {
        console.log(error);
        next(error);
    });
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/users/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};

exports.get_signup = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('signup', {
        csrfToken: request.csrfToken(),
        username: request.session.username || '',
        error: error,
    })
};

exports.post_signup = (request, response, next) => {
    if (request.body.password != request.body.password_confirm) {
        request.session.error = 'Las contraseñas no coinciden';
        return response.redirect('/users/signup');
    } else {
        const user = new User(
            request.body.username, request.body.nombre, request.body.password, request.body.correo);
        user.save().then(() => {
            return response.redirect('/users/login');
        }).catch((error) => {
            console.log(error);
            next(error);
        });
    }
};