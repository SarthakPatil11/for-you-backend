const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: false
    },
    path: {
        type: String,
        required: false
    },
})

const answeredDetailSchema = new mongoose.Schema({
    questionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'answeredDetail',
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
})
const questionSchema = new mongoose.Schema({
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'assignmentData',
        required: true
    },
    question: {
        type: String,
        required: false
    },
    answer: {
        type: String,
        required: false
    },
    queID: {
        type: String,
        required: false
    },
    ansID: {
        type: String,
        required: false
    },
})

const assignmentDataSchema = new mongoose.Schema({
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
        required: true
    },
    assignment_name: {
        type: String,
        required: true
    },
    question_type: {
        type: String,
        required: true
    },
    Total_question: {
        type: Number,
        required: false
    },
    answered_question: {
        type: Number,
        required: false
    },
    answered_question_id: [answeredDetailSchema],
    questions: [questionSchema],
    // image: {

    // },
    isCompleted: {
        type: Boolean,
        default: false
    },
});

const chapterSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chapter_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    assignment: [assignmentDataSchema]
});


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    totalPoints: {
        type: Number,
        required: true
    },

    chapter: [chapterSchema]
});


// const userSchema = new mongoose.Schema({
//     username:{
//         type: String,
//         required: true,
//     }
// });




module.exports = {
    userSchema: mongoose.model("users", userSchema),
    chapterSchema: mongoose.model("chapters", chapterSchema),
    assignmentDataSchema: mongoose.model("assignmentData", assignmentDataSchema),
    imageSchema: mongoose.model("image", imageSchema),
    questionSchema: mongoose.model("question", questionSchema),
    answeredDetailSchema: mongoose.model("answeredDetail", answeredDetailSchema),
}






