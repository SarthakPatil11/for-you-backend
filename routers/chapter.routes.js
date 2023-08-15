const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const {  userSchema ,chapterSchema, assignmentDataSchema} = require('../models/user')


router.post("/create", async (req, res) => {
    try {
        const data  = req.body.data;
        const user_data = await userSchema.findOne({ _id: data.userId })
        if(!user_data){
            res.status(400).json({
                messaage: "User not existed"
            })
        }
        // data.userId = (user_data._id).toString();
        // const note_data = await notesSchema.find({ userid: user_id })
        // console.log(note_data)
        const create_chapter = new chapterSchema(data)
        const new_chapter = await create_chapter.save()
        res.json(new_chapter)
    }
    catch (error) {
        res.status(400).json({
            error
        })
    }
});

router.get("/", async (req, res) => {
    try {
        const alldata = await chapterSchema.find()
        const addassignment = alldata.forEach(async(chapter)=>{;
            const id = (chapter._id).toString();
            const assignmentinfo = await assignmentDataSchema.find({chapterId:id})
            chapter.assignment = assignmentinfo
            chapter.save()
        })
        res.json(alldata)
    }
        
    catch (error) {
        res.status(500).json({
            error
        })

    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body.data;
  
    // Find the document by ID and update it
    chapterSchema.findByIdAndUpdate(id, updatedData, { new: true }, (err, updatedModel) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update document' });
      } else {
        res.status(200).json(updatedModel);
      }
    });
  });

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params 
        const chapter_data = await chapterSchema.findOne({ _id: id})
        // const assignmentinfo = await assignmentDataSchema.find({chapterId:id})
        // chapter.assignment = assignmentinfo
        // chapter.save()
        const chapter_id = (chapter_data._id).toString();
        const assignmentInfo = await assignmentDataSchema.find({chapterId:chapter_id})
        chapter_data.assignment =assignmentInfo
   
        await chapter_data.save()
        res.json(chapter_data)
    }
    catch (error) {
        res.status(500).json({
            error
        })

    }
});


module.exports = router;