var express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// @route POST api/users/register
// @desc Register user
// @access Public

// Load input validation

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const Users = require("../../models/Users");

router.post('/register',(req,res) => {

    const {errors,isValid} = validateRegisterInput(req.body);
    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    //check already existing user
    Users.findOne({email:req.body.email},(err,user) => {
       if(err) throw(err);
        

        if(user)
        {
            return res.status(400).json({email:"Email alreay exists"});

        }
        else
        {  console.log("newuser");
            const newUser = new Users({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone
              });
                       //hashing password 
            bcrypt.genSalt(10,(err,salt) => {
            bcrypt.hash(newUser.password,salt,(err,hash) => {
                
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => res.status(200).json(user))
                .catch(err => console.log(err));
            });
            
        });
        }

    });

   

   
     
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

router.post('/login',(req,res) => {
     console.log(req.body);
     const {errors,isValid} = validateLoginInput(req.body);
      
     //check validation
     if(!isValid){
         res.status(400).json(errors);
     }

     
     const password = req.body.password;
     
     //find user by email
     Users.findOne({email:req.body.email},(err,user) => {
      
        if(err) throw err;

        if(user)
        {  console.log(password);
            //check password
            bcrypt.compare(password , user.password,(err,isMatch) => {
                console.log(isMatch);
                console.log(user.password);
                if(isMatch)
                { console.log("user matched");
                    //user matched
                    //create jwt payload
                    const payload = {
                        id : user.id,
                        name : user.name

                    };
                    //sign token
                     console.log(payload);
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                          expiresIn: 31556926 // 1 year in seconds
                        },
                        (err, token) => {
                          res.status(200).json({
                            success: true,
                            token: "Bearer " + token
                          });
                    });

                }else {
                    return res
                      .status(400)
                      .json({ passwordincorrect: "Password incorrect" });
                  }
                
            });
        }
        else{
            return res.satus(400).json({emailnotfound:"Email not found"});
        }
     });

});

module.exports = router;