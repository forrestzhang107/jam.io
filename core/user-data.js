const userData = [
  {
    username: 'zachfinch',
    password: 'password'
  },
  {
    username: 'evanlanning',
    password: 'password'
  },
  {
    username: 'dennistran',
    password: 'password'
  },
  {
    username: 'briannguyen',
    password: 'password'
  },
  {
    username: 'sandertang',
    password: 'password'
  },
  {
    username: 'forrestzhang',
    password: 'password'
  },
]

function getUserData(username) {
  for (const user of userData) {
    if (user.username == username) return user
  }
  return null
}

exports.getUserData = getUserData
