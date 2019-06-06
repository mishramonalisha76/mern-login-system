const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const Users = require("../../models/Users");

router.post('/register',(req,res) => {

    const {errors,isValid} = validRegisterInput(req.body);
    //check validation
    if(!isValid){
        return res.status(400).jason(errors);
    }
    //check already existing user
    Users.findOne({email:req.body.email},(err,user) => {
       if(err) throw(err);
        

       else if(user)
        {
            return res.status(400).jason({email:"Email alreay exists"});

        }
        else
        {
            const newUser = new Users({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
              });
        }

    });

    //hashing password 
    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(newUser.password,salt,(err,hash) => {
            if(err) throw err;
            newUser.save()
            .then(user => req.jason(user))
            .catch(err => console.log(err));
        });
    });
     
});