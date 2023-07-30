const express = require('express');
const User = require('../models/User')
const router = express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = "amantiwariisbestcoder";

// ROUTE - 1 : Create a user using : POST "api/auth/createuser". Doesn't require auth
router.post('/createuser', [
    body('name',"Enter a valid name").isLength({min : 3}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password must be atleast 5 chars").isLength({min : 5})

] ,async (req, res) => {
    // if there are errors, return bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({success, errors:errors.array()});
    }

    //check whether user with same email exists already
    try {
        let user = await User.findOne({email: req.body.email});
        if(user) {
            return res.status(400).json({success, error: "Email already exists!"});
        }

        const salt = await bcrypt.genSalt(10); // generating salt
        let secPass = await bcrypt.hash(req.body.password, salt); // creating password hash

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        // .then(user => res.json(user))
        // .catch(err => {console.log(err)})
        const data = {
            user : {
                id : user.id,
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        success = true;
        res.json({success, authToken});
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Internal server error occured!");
    }
})

// ROUTE - 2 : Authenticate a user using : POST "api/auth/loginr". Doesn't require auth
router.post('/login', [
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password must be atleast 5 chars").isLength({min : 5})
    
], async (req, res) => {
    // if there are errors, return bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({success, errors:errors.array()});
    }
    // console.log(req.body)
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success, error : "Try again with correct credentials"})
        }
        
        const passCompare = await bcrypt.compare(password, user.password);
        if(!passCompare) {
            return res.status(400).json({success, error : "Try again with correct credentials"})
        }

        const data = {
            user : {
                id : user.id,
            }
        };
        success = true;
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({success, authToken, Status : "Logged in"});
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Internal server error occured!");
    }
});

// ROUTE - 3 : Get looged in user details using : POST "/api/auth/getuser". Login required

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        let userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
    }
    
    catch(err) {
        res.status(500).send("Internal server error occured");
    }
})

module.exports = router;