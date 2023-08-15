const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const { imageSchema } = require('../models/user')

router.post("/create", async (req, res) => {
    try {
        const data  = req.body;
        const create_image_url = new imageSchema(data)
        const create_image = await create_image_url.save()
        res.json(create_image)
    }
    catch (error) {
        res.status(400).json({
            error
        })
    }
});

router.get("/", async (req, res) => {
    try {
        const alldata = await imageSchema.find()
        res.json(alldata)
    }
    catch (error) {
        res.status(400).json({
            error
        })
    }
})
module.exports = router;