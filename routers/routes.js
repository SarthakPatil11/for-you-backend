const express = require('express');
const { ObjectId } = require('mongodb');
const { updateMany, updateOne, find } = require('../models/user');
const router = express.Router();
const { notesSchema, userSchema, dataSchema } = require('../models/user')


/*

router.get("/", async (req, res) => {
    try {
        // res.render("index",{title : "Home Page"});
        const alldata = await data.find()
        res.json(alldata)
    }
    catch (err) {
        res.send('Error' + err)
    }
}

); // get method == read

router.get("/:username", async (req, res) => {
    try {
        const { username } = req.params;
        // res.render("index",{title : "Home Page"});
        const singledata = await data.find({username:username}) 
        // console.log(singledata)
        res.json(singledata)
    }
    catch (err) {
        res.send('Error' + err)
    }
}

); // read data by id single data field


router.post("/", async (req, res) => {
    const newNote = new data({
        username: req.body.username,
        note: req.body.note,
        createDate: req.body.createDate

    })

    try {
        const notes = await newNote.save()
        res.json(notes)
    }
    catch (err) {
        res.send('Error' + err)
        
    }
}); // create data 


router.patch("/:username", async (req, res) => {
    try {
        const {username} = req.params;
        const {note} = req.body;
        const updatenote = await data.findOneAndUpdate({'username': username}, {note})
        // console.log(updatenote)
        updatenote.note =note;
        // console.log(updatenote)
        const updated = await updatenote.save()
        res.json(updated)
    } catch (err) {
        res.send('Error' + err)
    }

}); // update note

router.delete("/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const deletenote = await data.findOneAndDelete({username})
        // console.log(deletenote)
        res.send(`${deletenote.username} deleted`)
    }
    catch (err) {
        res.send('Error' + err)
    }
}); // delete note by id 
*/

// router.get("/:username", async (req, res) => {
//     try {

//         // const { note } = req.body;
//         const { username } = req.params;
//         const newnote = await data.find({'username':username}) 
//         // if(data.find({username})){
//             console.log(newnote)  
//             // const addnote = new data({
//             //     username : username,
//             //     note : note
//             // })
//             // const addnote = await data.({note:note})
//             // const addnew = await addnote.save()
//             // res.json(addnew)
//         // }
//     }
//     catch (err) {
//         res.send('Error' + err)
//     }

// })


router.get("/", async (req, res) => {
    try {
        const alldata = await userSchema.find()
        res.json(alldata)
    }
    catch (error) {
        res.status(500).json({
            error
        })

    }
});

router.get("/:username", async (req, res) => {
    try {
        const { username } = req.params
        const user_data = await userSchema.findOne({ username: username })

        // console.log(variable, typeof variable)
        res.json(user_data)
    }
    catch (error) {
        res.status(500).json({
            error
        })

    }
});



router.post("/", async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({
                messaage: "invalid req body"
            })
        }
        let user = await userSchema.findOne({ username: username });
        let newUser;
        if (!user) {
            newUser = new userSchema({
                username: username
            })
            user = await newUser.save()
            return res.status(200).json({
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
}); // create data 



router.post("/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const { note } = req.body;
        const user_data = await userSchema.findOne({ username: username })
        if(!user_data){
            res.status(202).json({
                messaage: "Username not existed"
            })
        }
        const user_id = (user_data._id).toString();
        const note_data = await notesSchema.find({ userid: user_id })
        console.log(note_data)
        const create_note = new notesSchema({
            userid: user_id,
            note: note
        })
        const new_note = await create_note.save()
        res.json(new_note)
    }
    catch (error) {
        res.status(500).json({
            error
        })
    }
});

router.get("/:username/notes", async (req, res) => {
    try {
        const { username } = req.params
        const user_data = await userSchema.findOne({ username: username })
        const user_id = (user_data._id).toString();
        const note_data = await notesSchema.find({ userid: user_id })
        const notes =note_data.map((_note,id)=> {
            return({note:_note.note,id: _note._id})   
        })
        // To-Do note1 = `note${index+1} `
        res.status(200).json({
            data: {
                user : user_data.username,
                notes:notes
                
            },
            messaage:"Fetched user and notes"
        })
    }
    catch (error) {
        res.status(500).json({
            error
        })

    }
});

router.patch("/:username", async (req, res) => {
    try {
        const { username } = req.params
        const {id,note} = req.body
        const user_data = await userSchema.findOne({ username: username })
        const user_id = (user_data._id).toString();
        const note_data = await notesSchema.updateOne({ userid: user_id,_id :new ObjectId(id)},{note: note})
        res.json(note_data)

    } catch (err) {
        res.send('Error' + err)
    }

}); 


router.delete("/:username", async (req, res) => {
    try {
        const { username } = req.params
        const {id} = req.body
        const user_data = await userSchema.findOne({ username: username })
        const user_id = (user_data._id).toString();
        const note_data = await notesSchema.deleteOne({ userid: user_id,_id :new ObjectId(id)})
        res.json(note_data)

    } catch (err) {
        res.send('Error' + err)
    }

}); 


module.exports = router;




























