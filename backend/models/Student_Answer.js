const mongoose = require('mongoose');

const Student_AnswerSChmea = mongoose.Schema({
  Student:{
    type:Schema.types.objectId,
    ref:"User",
    require:true,
  },
  Question:{
    type:Schema.types.objectId,
    ref:"Question",
    require:true,
  },
  Answer:{
    type:String,
    require:true,
  }


});

module.exports = mongoose.model('Student_Answer', Student_AnswerSChmea);
