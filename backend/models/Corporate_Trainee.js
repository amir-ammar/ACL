const mongoose = require('mongoose');

const Corporate_TraineeSchema = mongoose.Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    requested_Course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
    },
});

module.exports = mongoose.model('Corporate_Trainee', Corporate_TraineeSchema);
