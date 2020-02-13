const path = require('path')

const express = require('express')
const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

const routes = require('./routes/TodoRoutes')
app.use('/todos', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  // res.redirect('/404')
  next(err)
})

function errorHandler (err, req, res, next) {
	if (res.headersSent) {
		return next(err)
	}

	res.locals.message = err.message

	res.status(err.status || 500)
	res.render('error', { error: err })
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
