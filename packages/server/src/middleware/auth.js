const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
    const token = req.header('x-auth-token')
    if(!token){
        return res.status(401).json({msg: 'No token'})
    }
    try{
        const decoded = jwt.verify(token, config.jwt.secret)
        req.user = decoded.user
        next()
    }catch(err){
        res.send("Token is not valid")
    }
}