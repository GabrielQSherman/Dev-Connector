const User = require("../models/User");
const validator = require("validator");
const bcrypt = require("bcrypt");


const failedLogin = ( req, res) => {
    res.status(409).json({message: "Login Failed"});
}

module.exports = async (req, res, next) => {

    try {

        const {login, password: pass} = req.body;

        if (!login || !pass) {
            console.error('\nLogin Failed: Login Credentials Not Present');
            return failedLogin(req,res)
        }

        if (login === undefined || login.trim() === '') {
            console.error('\nLogin Failed: Email Or Username Not Valid');
            return failedLogin(req,res)
        }

        const userSearch = await User.findOne({$or: [{email: login}, {username: login}]});

        if (userSearch === null) {
            console.error('\nLogin Failed: Email/Username Not In Use');
            return failedLogin(req,res)
        }

        const passwordTest = 
                (pass === undefined || pass.trim() === '') 
                    ? false 
                    : await bcrypt.compare(pass, userSearch.password);

        if (!passwordTest) {
            console.error('\nLogin Failed: Password Invalid');
            return failedLogin(req,res)
        }

        req.id = userSearch._id;

        next() //if code execution reaches here, it is assumed the user has successfully logged in
        
    } catch (err) {
        res.status(500).json({
            errorAt: err.stack,
            message: err.message || 'err'
        })
    }
}
