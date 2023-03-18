const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
      res.redirect('/login')
    } else {
      next()
    }
  }
  
export default requireAuth
  