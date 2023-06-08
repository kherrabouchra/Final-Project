const checkRole = (role) => (req, res, next) => {
    if (req.user.role === role) {
      return next();
    }
  
    return res.redirect('/dashboard');
  };
  