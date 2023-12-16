const mongoose = require('mongoose');

const councselorSchema = mongoose.Schema({
    CounselorLicenseNumber:{
        type:Number,
        unique:true
    },
    Specialization:{
        type:String,
    },
    Experience:{
        type:Number,
    },
    WorkingIn:{
        type:String,
    },
    Portfolio:{
        type:String
    } 
});

module.exports = new mongoose.model('Counselor',councselorSchema);