const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const { userSchema, chapterSchema, assignmentDataSchema, questionSchema } = require('../models/user')

router.post("/create", async (req, res) => {
    try {
        const data = req.body.data;
        const chapter_data = await chapterSchema.findOne({ _id: data.chapterId })
        if (!chapter_data) {
            res.status(400).json({
                messaage: "chapter not existed"
            })
        }
        const create_assignment = new assignmentDataSchema(data)
        const new_assignment = await create_assignment.save()
        res.json(new_assignment)
    }
    catch (error) {
        res.status(400).json({
            error
        })
    }
});

router.post("/question/create", async (req, res) => {
    try {
        const data = req.body.data;
        const assignment_data = await assignmentDataSchema.findOne({ _id: data.assignmentId })
        if (!assignment_data) {
            res.status(400).json({
                messaage: "Assignment not existed"
            })
        }
        const create_question = new questionSchema(data)
        const new_question = await create_question.save()
        res.json(new_question)
    }
    catch (error) {
        res.status(400).json({
            error
        })
    }
});

router.get("/", async (req, res) => {
    try {
        const alldata = await assignmentDataSchema.find()
        res.json(alldata)
    }
    catch (error) {
        res.status(400).json({
            error
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        // const assignment_data = await chapterSchema.findOne({ _id: id})
        // const chapter_id = (assignment_data._id).toString();
        console.log(id)
        const assignmentInfo = await assignmentDataSchema.findOne({ _id: id })
        // console.log(assignmentInfo[0]._id,">>assignmentInfo")
        const assignment_id = (assignmentInfo._id).toString();
        // console.log(assignment_id,">>assignment_id")
        const questionInfo = await questionSchema.find({ assignmentId: assignment_id })
        assignmentInfo.questions = questionInfo
        // console.log(assignmentInfo[0].questions,">>questionInfo")

        await assignmentInfo.save()
        // assignment_data.assignment =assignmentInfo
        console.log("last step")
        // await assignment_data.save()
        res.json(assignmentInfo)
    }
    catch (error) {
        console.log(error, ">>error")
        res.status(500).json({
            error
        })

    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body.data;
    console.log(updatedData, ">>updatedData", id)

    // Find the document by ID and update it
    assignmentDataSchema.findByIdAndUpdate(id, updatedData, { new: true }, (err, updatedModel) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update document' });
        } else {
            res.status(200).json(updatedModel);
        }
    });
});
module.exports = router;