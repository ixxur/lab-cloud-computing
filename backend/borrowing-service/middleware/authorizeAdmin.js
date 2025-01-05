const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next(); // User is an admin
    } else {
      res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  };

  export default authorizeAdmin;