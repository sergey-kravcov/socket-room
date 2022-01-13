const { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH } = require('./game')

const errors = {
  USERNAME_LENGTH: {
    message: `Никнейм должен содержать от ${USERNAME_MIN_LENGTH} до ${USERNAME_MAX_LENGTH} символов.`,
    field: 'username',
  },
  UNUNIQUE_USERNAME: {
    message: 'В выбранной комнате уже есть игрок с таким Никнеймом!',
    field: 'username',
  },
  NONEXISTENT_ROOM: {
    message: 'Такой комнаты не существует!',
    field: 'room',
  },
  PLAYERS_LIMIT: {
    message: 'В этой комнате нет свободных мест.',
    field: 'room',
  },
  NOT_AUTHORIZED: {
    message: 'Необходимо авторизоваться!',
  },
}

module.exports = errors
