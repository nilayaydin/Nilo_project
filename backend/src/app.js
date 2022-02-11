/* eslint-disable func-names */
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
require('./database-connection')
const mongoose = require('mongoose')
const cors = require('cors')

const User = require('./models/User')

const socketService = require('./socket-service')

const clientPromise = mongoose.connection.asPromise().then(connection => connection.getClient())

const indexRouter = require('./routes/index')
const accountsRouter = require('./routes/accounts')
const usersRouter = require('./routes/users')
const ordersRouter = require('./routes/orders')
const productsRouter = require('./routes/products')

const app = express()

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

if (app.get('env') == 'development') {
  /* eslint-disable-next-line */
  app.use(require('connect-livereload')())
  /* eslint-disable-next-line */
  require('livereload')
    .createServer({ extraExts: ['pug'] })
    .watch([`${__dirname}/public`, `${__dirname}/views`])
}

app.set('trust proxy', 1)

app.set('io', socketService)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev')) // logs the request
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(
  session({
    secret: ['thisisnotasupersecuresecretsecret', 'thisisanothersupernotsosecretsecret'], // generate a random Id and do not use this because its guessable.
    store: MongoStore.create({ clientPromise, stringify: false }),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // our session expires in 30 day in milliseconds
      path: '/api',
      sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
      secure: process.env.NODE_ENV == 'production',
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', (req, res, next) => {
  req.session.viewCount = req.session.viewCount || 0
  // eslint-disable-next-line no-plusplus
  req.session.viewCount++
  next()
})

app.use('/api/', indexRouter) // corresponding routehandler
app.use('/api/accounts', accountsRouter)
app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/products', productsRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// eslint-disable-next-line no-console
console.log('im dead')

module.exports = app
