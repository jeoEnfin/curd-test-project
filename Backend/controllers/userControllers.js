const bcrypt = require('bcrypt');

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
  
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      res.json({ message: 'Login successful' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

module.exports ={createUser,loginUser}