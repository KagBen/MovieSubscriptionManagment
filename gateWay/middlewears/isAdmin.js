const isAdmin = (req, res, next) => { 
    console.log("from mw:");
    console.log(req.session);
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