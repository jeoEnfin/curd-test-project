const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
    bookName: { type: String, required: true, },
    auther: { type: String, required: true, },
    year: { type: Number, required: true, },
    price: { type: Number, required: true, },
    status: { type: Number, required: true, },
}, { timeStamps: true, });


module.exports = mongoose.model("Books", bookSchema);