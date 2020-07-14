const User = require('../models/User');
const validator = require("validator");

const validate = async (req, res, next) => {

  const email = req.body.email,
        pass = req.body.password,
        username = req.body.username,
        failedValues = [];
        
        if (!email || !validator.isEmail(email)) {
            failedValues.push({
                key: "email",
                message: "Valid Email Required"
            })
        }

        const emailExist = await User.findOne({ email: email }) != null; //expected outcome: boolean

        if (emailExist) {
            failedValues.push({
                key: "email",
                message: "Email Already In Use"
            })
        }

        if ( 
            username === undefined
            || !validator.isLength(username, {min: 4, max: 20}) 
            || !validator.isAlphanumeric(username, 'en-US') 

        ) {
            failedValues.push({
                key: "username",
                message: "Length Failed Requirements OR Used Invalid Characters"
            })
        }


        if ( 
            pass === undefined
            || !validator.isLength(pass, {min: 7, max: 100}) 
            || !validator.isAscii(pass, 'en-US') 

        ) {
            failedValues.push({
                key: "password",
                message: "Length Failed Requirements OR Used Invalid Characters"
            })
        }

        if (failedValues.length > 0) {
            res
            .status(400)
            .json({
                validation_error: failedValues
            })
        } else { next() }

}

module.exports = validate;