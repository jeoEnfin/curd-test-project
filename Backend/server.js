require('dotenv').config();
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const bookRouter = require('./routes/books');


const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

app.use('/api/books',bookRouter)


mongoose.connect(process.env.MONG_URL)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('connected  to db & running on port ' ,process.env.PORT);
    });
})
.catch((err) => {
    console.log(err);
    
});

