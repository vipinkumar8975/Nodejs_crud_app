const express = require('express');
const router = express.Router()

const userController = require('../controllers/user.controllers');

router.get('/findAll', userController.findAll);

router.post('/create', userController.create);

// router.post('/image', userController.image);

router.get('/:id', userController.findOne);

router.put('/:id', userController.update);

router.delete('/:id', userController.delete);

module.exports = router

