const permissionValidate = (param) => {
  return (req, res, next) => {
    const permission = req.session.permission;
    const found = permission.find((p) => p === param);
    if (!found) {
      return res.status(401).json({
        message: `User Not Have Permission to this action : ${param}`,
      });
    }
    // Call next() to pass control to the next middleware or route handler
    next();
  };
};

module.exports = permissionValidate;
