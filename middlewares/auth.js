const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token){
        res.status(401).json({msg: "Access Denied."});
        return;
    }

    try{
        const decode = jwt.decode(token, process.env.secret_key);
        req.user = decode;
        next();
    } catch(err){
        res.status(400).json({msg: "Invalid Token!"});
        return;
    }
};