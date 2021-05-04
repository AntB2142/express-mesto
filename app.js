const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const NotFoundError = require('./errors/NotFoundError');
const {
  createUser,
  login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const { userValidation, loginValidation } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());

app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use(errors());

app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(err.statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message, err });

  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server listen on ${PORT}`);
});
