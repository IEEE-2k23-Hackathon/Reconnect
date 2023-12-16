const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const connectDB = require('./db/connectDB');
const Routes = require('./routes/routes');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', Routes);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
    }
    catch (err){
        console.log(err);
    }
}
start();

const server = app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
});




