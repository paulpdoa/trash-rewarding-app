require('dotenv').config();

const express = require('express');
const mainRoute = require('./routes/mainRoute');
const app = express();
const mongoose = require('mongoose');

const port = 8000 || process.env.PORT;

// Connect to MongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pbmpdqm.mongodb.net/?retryWrites=true&w=majority`;
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

app.use(mainRoute);
app.use(express.json());