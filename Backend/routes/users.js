const express = require('express');

const {createUser,currentUser} = require('../controllers/userControllers');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.route('/createUser').post(createUser);
router.route('/currentUser').get(validateToken,currentUser);

module.exports = router;