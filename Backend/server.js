require('dotenv').config();
const cors = require('cors');

const express = require('express');
const connectDb = require('./config/dbConnection')

//routes
const bookRouter = require('./routes/books');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');


//middleware
const errorHandler = require('./middleware/errorHandler')


connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

app.use('/api/books',bookRouter);
app.use('/api/users', userRouter);
app.use('/login', authRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




