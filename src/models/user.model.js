const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    imagePath:String,
    is_active: {type: Boolean, default:false},
    is_verified: {type: Boolean, default:false},
    is_deleted: {type: Boolean, default:false},
},{
    timestamps: true
});

module.exports =  mongoose.model('user', userSchema)