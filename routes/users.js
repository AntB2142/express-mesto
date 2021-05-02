const express = require('express');

const routes = express.Router();

const {
  idValidation,
  userUpdateValidation,
  avatarUpdateValidation,
} = require('../middlewares/validation');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

routes.get('/users', getUsers);
routes.get('/users/me', idValidation, getCurrentUser);
routes.get('/users/:id', idValidation, getUserById);
routes.patch('/users/me', userUpdateValidation, updateUser);
routes.patch('/users/me/avatar', avatarUpdateValidation, updateAvatar);

module.exports = routes;
