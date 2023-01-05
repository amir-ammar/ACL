const mongoose = require('mongoose');

const CorporateSchema = mongoose.Schema({
  Name: {
    type: String,
    required: [true, 'Please provide a corporate name'],
  },

  Trainee: {
    type: Schema.Types.ObjectId,
    ref:"Corporate_Trainee",
    required:true,
  },
  url: {
    type: String,
  },
  Courses:{
    type:Schema.Types.ObjectId,
    ref:"Course",
    required:true,
  },
  fund:{
    type:Number,
    require:true,
  }
});

module.exports = mongoose.model('Corporate', CorporateSchema);
