

const CourseRequest = require("../models/CourseRequest");


const getAllRequest = async (req, res) => {
    let requests = await CourseRequest.find({});
    res.status(200).json(requests);
}

const addRequest = async (req, res) => {
    const { userId } = req.user;
    const { courseId } = req.params;
    let request = new CourseRequest({ course: courseId, createdBy: userId, state: "PENDING" });
    request = await request.save();
    console.log(request);
    res.status(201).json(request);
}

const getRequests = async (req, res) => {
    try {
        const { userId } = req.user;
        const { courseId } = req.params;
        let request = await CourseRequest.find({ createdBy: userId, course: courseId });
        res.status(200).json(request);
    }
    catch (err) {
        res.status(200).json([]);
    }
}


module.exports = { addRequest, getAllRequest, getRequests };



