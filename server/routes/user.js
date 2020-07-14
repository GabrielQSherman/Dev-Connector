const User = require("../models/User");
const router = require("express").Router();
const validator = require("validator");
const bcrypt = require("bcrypt");
const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const validateUser = require('../middleware/validateUser');
const authUser = require('../middleware/authUser')

//POST route for Users
//localhost:4000/user
//@desc post/make a new user and store in users collection
//@path (server path)/user/
//@access public
router.post(
    "/", 
    validateUser,
    async (req, res) => {

        const {username, password, email } = req.body;

        const registerData = {
            password: await bcrypt.hash(password, 7),
            username: username,
            email: email
        }
        
        try {

            const newUser = await User.create(registerData);

            res.json({
                msg: "user created successfully",
                document: newUser
            });
            
        } catch (error) {
            res
            .status(500)
            .json({error: error.message || error});
        }
    
})

//PUT (login) route for Users
//localhost:4000/user
//@desc put/login a new user and store in users collection
//@path (server path)/user/
//@access public
router.put(
    "/", 
    authUser,
    async (req, res) => {
        
        const token = jwt.sign({id: req.id}, secret);

        res.json(token);
       
    }
)

module.exports = router;