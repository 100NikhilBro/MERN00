const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => { console.log("connected Succesfully") }).catch((e) => {
        console.log("Failed to Connect", e)
    })
}


module.exports = dbConnect;