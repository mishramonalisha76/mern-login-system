var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type:String,
        required:true},
    email: {type:String,required:true,
        unique:true},
    phone: {type:String,required:true,
        unique:true},
    password: {type:String,
        required:true},
    gender: {type:String},
    date:{type: Date,
        default: Date.now}
});

module.exports = userModel= mongoose.model('user',userSchema);