const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      return res
        .status(403)
        .json({
          message: "Forbidden: You do not have access to this resource",
        });
    }
  };
};

module.exports = authorizeRole;
