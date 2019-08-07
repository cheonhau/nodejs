const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    birthDay : {
        type : Date,
        required : true
    },
    note : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    }
},{
    timestamps: {
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    }
});
const Simple = mongoose.model('Simple', UserSchema);

module.exports = Simple;