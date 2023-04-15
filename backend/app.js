require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
const mainRoute = require('./routes/mainRoute');    
const port = 8000 || process.env.PORT;

// Connect to MongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pbmpdqm.mongodb.net/${process.env.APP_NAME}?retryWrites=true&w=majority`;
const connectToDB = async () => {
    try {   
        await mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(port,() => {
            console.log(`Listening on port ${port}, DB connected!`);
        })
    }
    catch(err) {
        console.log('Cannot connect to DB')
        console.log(err);
    }
}

connectToDB();

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(mainRoute);
