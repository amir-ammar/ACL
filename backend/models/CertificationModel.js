
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CertificationModelSchema = new Schema({
    user : {
        type:Schema.Types.ObjectId, 
        ref : "User",
        required:[true,"user for certification is needed"]
    },
    course : {
        type:Schema.Types.ObjectId,
        ref:"Course",
        required:[true,"course for certification is needed"]
    },
    created : {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("CertificationModel",CertificationModelSchema);

