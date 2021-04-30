const express = require('express');

const routes = express.Router();
const {
  idValidation,
  cardValidation,
} = require('../middlewares/validation');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

routes.get('/cards', getCards);
routes.post('/cards', cardValidation, createCard);
routes.delete('/cards/:id', idValidation, deleteCard);
routes.put('/cards/:id/likes', likeCard);
routes.delete('/cards/:id/likes', dislikeCard);

module.exports = routes;
