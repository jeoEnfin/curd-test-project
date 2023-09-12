const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');


const bookSchema = mongoose.Schema({
    user_id: {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    bookName: {
        type: String,
        required: true,
    },
    auther: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: 1000,
        max: 9999
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
}, { timeStamps: true, });

bookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Books", bookSchema);