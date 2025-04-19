require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log("our db is connected"))
.catch((err) => console.log(err))
