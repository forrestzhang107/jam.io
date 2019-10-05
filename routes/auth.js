const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const express = require('express')
const session = require('express-session')
const router = express.Router()
const ud = require('../core/user-data')

passport.use(new LocalStrategy(
  async (username, password, done) => {
    const userData = await ud.getUserData(username)
    if (!userData) return done(null, false)
    if (password != userData.password) return done(null, false)
    return done(null, username)
  }
))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (user, done) => {
  done(null, user)
})

router.use(session({ secret: 'jam.io!', resave: false, saveUninitialized: false }))
router.use(passport.initialize())
router.use(passport.session())

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.end()
})

router.post('/logout', (req, res) => {
  req.logout()
  res.end()
})

router.get('*', (req, res, next) => {
  const url = req.url
  if (url.split('/')[1] == 'auth' && !req.isAuthenticated()) {
    console.log('blocked request: ' + url.substring(1, url.length))
    res.redirect('/')
  }
  else next()
})

module.exports = router
