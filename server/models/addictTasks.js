const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description:{
      type: String,
      required: true,
    },
  });

const addictTaskSchema = mongoose.Schema({
    addictType:{
        type:String,
        required:true,
        unique:true
    },
    Level1:{
        tasks:[taskSchema]
    },
    Level2:{
        tasks:[taskSchema]
    },
    Level3:{
        tasks:[taskSchema]
    }
})

module.exports = new mongoose.model('AddictTasks',addictTaskSchema);