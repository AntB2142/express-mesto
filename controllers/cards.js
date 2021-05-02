const Card = require('../models/card');

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      throw new ValidationError(err.message);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }

      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалять чужие карточки.');
      }

      Card.findByIdAndRemove(req.params.id)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    {
      runValidators: true,
      new: true,
    },
  )
    .orFail(new Error('ValidationError'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      throw new NotFoundError(err.message);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('ValidationError'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      throw new NotFoundError(err.message);
    })
    .catch(next);
};
