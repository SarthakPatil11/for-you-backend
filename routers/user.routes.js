const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const {  userSchema,chapterSchema,assignmentDataSchema } = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// get all user
router.get("/", async (req, res) => {
    try {
        const alldata = await userSchema.find()
        const addchapter = alldata.forEach(async(user)=>{;
            const id = (user._id).toString();
            const chapterinfo = await chapterSchema.find({userId:id})
            user.chapter =chapterinfo
            user.save()
        })
        res.json(alldata)
    }
        
    catch (error) {
        res.status(500).json({
            error
        })

    }
});

// create user
router.post("/create", async (req, res) => {
    try {
        console.log(req,">>")
        let data = req.body.data
        let user = await userSchema.findOne({ email:data.email});
        let newUser;
        // Hash the password
        data.password = await bcrypt.hash(data.password, 10);

        if (!user) {
            newUser = new userSchema(data)
            user = await newUser.save()
            return res.status(200).json({
                data: user,
                messaage: "inserted successful"
            })

        }
        res.status(200).json({
            messaage: "Username is alredy existed"
        })

        // TODO: find existing user or create a new user
        // TODO: add notes for that user

    }
    catch (error) {
        res.status(500).json({
            error
        })

    }
}); 

// Login API endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body.data;
  
    try {
      // Find the user by email        
      let user = await userSchema.findOne({ email});

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Create and return a JWT token
      const token = jwt.sign({ email: user.email }, 'secret-key');
  
      res.json({ token, user });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id', (req, res) => {
    console.log(">>>>>>>>>>>>>")
    const id = req.params.id;
    const updatedData = req.body.data;
  
    // Find the document by ID and update it
    userSchema.findByIdAndUpdate(id, updatedData, { new: true }, (err, updatedModel) => {
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
        const user_data = await userSchema.findOne({ _id: id})
        // console.log("id>>id>>id")
        console.log(user_data,">>user_data")
        const user_id = (user_data._id).toString();
        const chapterinfo = await chapterSchema.find({userId:user_id})
        user_data.chapter =chapterinfo
        // user_data.save()
        console.log(chapterinfo,">>chapterinfo")
        const addassignment = chapterinfo.forEach(async(chapter)=>{;
            const id = (chapter._id).toString();
            const assignmentinfo = await assignmentDataSchema.find({chapterId:id})
            console.log(assignmentinfo,">>assignmentinfo")
            chapter.assignment = assignmentinfo
            await chapter.save()
        })
        // console.log(user_data,">>id")

        await user_data.save()
        console.log("id>>id>>id")
        res.json(user_data)
    }
    catch (error) {
        res.status(500).json({
            error
        })

    }
});

  


module.exports = router;