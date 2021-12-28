const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: String,
    last_name: String,
    email: String,
    password:String,
    phone: String,
    image:String,
},{
    timestamps: true
});

module.exports =  mongoose.model('user01', userSchema)