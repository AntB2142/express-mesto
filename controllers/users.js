const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((Users) => res.status(200).send(Users))
    .catch((err) => res.status(500).send({ message: 'На сервере произошла ошибка.' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Пользователь не найден.' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные.' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    res.status(400).send({ message: 'Переданы некорректные данные.' });
  } else {
    User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true },
    )
      .then((user) => res.status(200).send(user))
      .catch((err) => {
        if (err.name === 'CastError') {
          return res.status(404).send({ message: 'Пользователь не найден.' });
        }
        return res.status(500).send({ message: 'На сервере произошла ошибка.' });
      });
  }
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    res.status(400).send({ message: 'Переданы некорректные данные.' });
  } else {
    User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true },
    )
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'CastError') {
          return res.status(404).send({ message: 'Пользователь не найден.' });
        }
        return res.status(500).send({ message: 'На сервере произошла ошибка.' });
      });
  }
};
