const { celebrate, Joi } = require('celebrate');

module.exports.idValidation = celebrate({
  params: Joi
    .object()
    .keys({
      id: Joi
        .string()
        .alphanum()
        .length(24),
    }),
});

module.exports.userValidation = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2),
      avatar: Joi.string().min(2).max(256),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
});

module.exports.cardValidation = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi
        .string()
        .required()
        .min(2)
        .max(30),
      link: Joi
        .string()
        .required()
        .min(2)
        .max(256),
    }),
});

module.exports.loginValidation = celebrate({
  body: Joi
    .object()
    .keys({
      email: Joi
        .string()
        .required()
        .email(),
      password: Joi
        .string()
        .required()
        .min(8),
    }),
});
