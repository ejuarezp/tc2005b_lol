const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canCreate = require('../util/can-create');
const canView = require('../util/can-view');
const personajesController = require('../controllers/personajes.controller');

router.get('/new', isAuth, canCreate, personajesController.get_add);
router.get('/add', isAuth, canCreate, personajesController.get_add);
router.get('/nuevo', isAuth, canCreate, personajesController.get_add);
router.post('/new', isAuth, canCreate, personajesController.post_add);
router.get('/old', isAuth, personajesController.get_old);
router.use('/:personaje_id', isAuth, canView, personajesController.get_list);
router.use(isAuth, canView, personajesController.get_list);

module.exports = router;