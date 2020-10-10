const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title : {
        type: String,
        required:true
    },
    amount : {
        type:String,
        required:true
    },
    note : {
        type: String,
        required:true
    },
    date : {
        type:String,
        required:true
    }

});

const expense = mongoose.model('expense',expenseSchema);

module.exports = expense;
