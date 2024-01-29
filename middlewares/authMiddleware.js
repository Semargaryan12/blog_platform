const jwt = require('jsonwebtoken');
require('dotenv').config();
const access_key = process.env.JWT_ACCESS_SECRET;
const { SuccessHandlerUtil } = require('../utils/success-handler.util');



async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (!token) {
       return res.status(409).send( { message: "Token not provided" });
    }

    jwt.verify(token, access_key, (err, decoded) => {
        if (err) {
            console.error(err);

            if (err.name === 'TokenExpiredError') {
                console.log('TokenExpiredError - Token has expired');
               return res.status(409).send( { message: 'Token has expired' });
            }

            console.log('Invalid accessToken:', err.message);   
           return res.status(401).send( { message: 'Invalid accessToken' });
        }

        req.user = { userId: decoded.userId };
        console.log(req.user, 'User ID from token');
        next();
    });
}

module.exports = { verifyToken }