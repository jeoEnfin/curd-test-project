const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel')


const createUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = new User({
        username: username,
        password: hashedPassword,
      });
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body; 
  
    try {
      const user = await User.findOne({ username: username });
      if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
         user: {
             username: user.username,
             id: user._id
         }
        },process.env.ACCESS_TOKEN_SECERT, {expiresIn: '15m'})
        res.status(200).json({accessToken})
     } else{
         res.status(401);
         throw new Error("Invalid credentials");
     }

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const currentUser = async (req, res) => {
  res.json(req.user)
};

module.exports ={createUser,loginUser,currentUser}