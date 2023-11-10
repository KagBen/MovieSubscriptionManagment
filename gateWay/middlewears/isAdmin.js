const isAdmin = (req, res, next) => { 

    if(req.session.role == 'admin')
    {
        next();
    }
    else { 
        return res.status(401).json({
            message: "Not Admin: Cant access to this request",
          });
    }
}
module.exports = isAdmin;