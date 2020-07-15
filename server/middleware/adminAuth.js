const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    
    const { JWT_SECRET: jwtKey, HEAD_AUTH_KEY: headerKey} = process.env;

    const userToken = req.headers[headerKey];

    try {
        
        const decodedData = jwt.verify(userToken, jwtKey);
        
        if (decodedData.id === undefined) { 
            throw new Error('Id was not defined in the payload')
        }

        const admin = await User.findOne({_id: decodedData.id, idAdmin: true});

        if (admin === null) {
            throw new Error('User is not an admin or id is invalid')
        }

        req.userId = decodedData.id;

        next()

    } catch (err) {

        const errMsg = err.message || err;
        
        console.error(`\nError In UserAuth: ${errMsg}\n`);

        return res.status(401).json({error: 'Not Authorized'})

    }

}