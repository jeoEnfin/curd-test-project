const mongoose = require('mongoose');
const Books = require('../models/bookModel');

const getBooks =  async (req, res) => {
    const books = await Books.find({}).sort({createdAt: -1});
    res.status(200).json(books);   
}

const getBook = async (req, res) => {
    res.status(200).json("books"+req.params.id); 
};

const createBook = async (req, res) => {
    const {bookName,auther,year,price,status} = req.body;

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
        const Book = await Books.create({bookName,auther,year,price,status});
        res.status(200).json(Book);
    }
    catch(err) {
        res.status(400).json({error: err.message});
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
    res.status(200).json(workout);
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
    res.status(200).json(book);
};

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}