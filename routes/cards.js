const express = require('express');

const routes = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

routes.get('/cards', getCards);
routes.post('/cards', createCard);
routes.delete('/cards/:id', deleteCard);
routes.put('/cards/:id/likes', likeCard);
routes.delete('/cards/:id/likes', dislikeCard);

module.exports = routes;
