const redirectLoggedIn = (req, res, next) => {
    if (req.session.userId) {
      res.redirect('/admin')
    } else {
      next()
    }
  }

module.exports = { redirectLoggedIn }