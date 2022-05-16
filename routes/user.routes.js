const express = require('express');
const router = express();

const userController = require('../controllers/user.controller');
const tokenCheck = require('../middleware/routeCheck.mw');

router.post('/create', userController.createUser);
router.get('/login', userController.logIn);
router.put('/edit/:id', tokenCheck, userController.editUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;

