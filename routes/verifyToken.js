//Create private routes
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

module.exports = function(req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified; // will give us back the id
    next(); //important
    }
    catch(err){
        res.status(400).send('Invalid Token');
    }
}