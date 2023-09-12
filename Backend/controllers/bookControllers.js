const mongoose = require('mongoose');
const Books = require('../models/bookModel');

const getBooks =  async (req, res) => {
    const pageNumber = req.query.page || 1;
    const pageSize = 10;
    Books.paginate({}, { page: pageNumber, limit: pageSize }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error occurred while fetching users.' });
      }
      const { docs, total, limit, page, pages } = result;
      res.json({ books : docs, total, limit, page, pages });
    });
}

const getBook = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'id is not a valid'});
    }
    const book = await Books.findById(id);
    if(!book){
        return res.status(404).json({error: 'No workouts found'});
        } 
    res.status(200).json(book); 
};

const createBook = async (req, res) => {
    const {bookName,auther,year,price,status=1} = req.body;
    let emptyFields = []
    if(!bookName) {
        emptyFields.push('bookName');
        }
    if(!auther){
        emptyFields.push('auther');
    }    
    if(!year){
        emptyFields.push('year');
    }
    if(!price){
        emptyFields.push('price');
    }
    if(!status){
        emptyFields.push('status');
    }
    if(emptyFields.length > 0){
            return res.status(400).json({error: 'Please fill in all fields',emptyFields});
        }

    try {
        const Book = await Books.create({bookName,auther,year,price,status,user_id:req.user.id});
        res.status(200).json({'books': Book});
    }
    catch(err) {
        res.status(400).json({error: err.message,emptyFields});
    }
};

const updateBook = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'id is not a valid'});
    }
    const book = await Books.findOneAndUpdate({_id: id},{...req.body});
    if(!book){
        return res.status(404).json({error: 'No books found'});
        }
    res.status(200).json(book);
};

const updateStatus = async (req, res) => {
    const {id} = req.params
    const newStatus = 0;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'id is not a valid'});
    }
    const book = await Books.findOneAndUpdate({_id: id},{ $set: { status: newStatus } });
    if(!book){
        return res.status(404).json({error: 'No books found'});
        }
    res.status(200).json("status updated");

};

const deleteBook = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'id is not a valid'});
    }
    const book = await Books.findOneAndDelete({_id: id});
    if(!book){
        return res.status(404).json({error: 'No books found'});
        }
    res.status(200).json({
            'title': 'Book has been deleted', 
            'book': book
        });
};

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    updateStatus
}