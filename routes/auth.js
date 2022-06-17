const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {registerValidation,loginValidation} = require('../validation');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


router.post('/register',async(req,res)=>{

    //Lets validate the data before we register a user
    const {error}= registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if user is always in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10); //10 is the complexity
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    // Create a new user
    const user= new User ({ //write any data to submit
        name:req.body.name,
        email:req.body.email,
        password: hashedPassword
    });
    try{ //try to submit a user
        const savedUser = await user.save(); //take user from above and save it
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
}); 

//Login
router.post('/login', async (req,res)=>{
    //Lets validate the data before we login a user
    const {error}= loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if user is always in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(!emailExist) return res.status(400).send('Email doesnt exists');

    //Password is correct
    const validPass= await bcrypt.compare(req.body.password,user.password); 
    if(!validPass) return res.status(400).send('Invalid Password');

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);
    res.send('Logged In');
});

module.exports = router;