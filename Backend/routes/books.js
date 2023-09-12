const express = require('express');

const {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    updateStatus
} = require('../controllers/bookControllers')
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.use(validateToken)
router.route('/').get(getBooks)
router.route('/:id').get(getBook).delete(deleteBook)
router.route('/statusUpdate/:id').patch(updateStatus)
router.route('/create').post(createBook)
router.route('/updateBook/:id').patch(updateBook)

module.exports = router;