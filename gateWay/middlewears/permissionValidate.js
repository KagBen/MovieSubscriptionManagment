const permissionValidate = (param) => {
    return (req, res, next) => {
      const permissions = req.session.permissions || []; // Ensure permissions is an array
      const found = permissions.some((p) => p === param);

      if (!found) {
        return res.status(401).json({
          message: `User does not have permission for this action: ${param}`,
        });
      }
      // Call next() to pass control to the next middleware or route handler
      next();
    };
  };
  
  module.exports = permissionValidate;
  