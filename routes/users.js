const express = require('express');

const routes = express.Router();

const {
  idValidation,
  userValidation,
} = require('../middlewares/validation');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

routes.get('/users', getUsers);
routes.get('/users/:id', idValidation, getUserById);
routes.patch('/users/me', userValidation, updateUser);
routes.patch('/users/me/avatar', userValidation, updateAvatar);

module.exports = routes;
