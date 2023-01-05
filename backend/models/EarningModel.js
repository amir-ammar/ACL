

const mongoose = require("mongoose");


const EarningSchema = mongoose.Schema({
    Instructor: {
        type: mongoose.Types.ObjectId,
        required: [true, "please add the instructor"],
        ref: "User"
    },
    earning: {
        type: Number,
        default:0
    },
    monthDate: {
        type: String
    }
})


module.exports = mongoose.model('Earning', EarningSchema);
