const express = require('express');

const {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/bookControllers')

const router = express.Router();

router.route('/').get(getBooks).post(createBook)
router.route('/:id').get(getBook).delete(deleteBook).patch(updateBook)



module.exports = router;