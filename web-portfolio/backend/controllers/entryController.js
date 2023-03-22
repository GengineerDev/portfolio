const connection = require('../config/db')

const db = connection.useDb('portfolio')
const Entry = require('../models/entry')

exports.createEntry = async (req, res) => {
    const { title, thumbnail, caption, images } = req.body
    const entry = new Entry({
        title,
        thumbnail,
        caption,
        images
    })
    try {
        // save the new entry to the database
        await entry.save()
        res.status(201).send(entry)
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.getEntry = async (req, res) => {
    // const { id } = req.params

    // try {
    //   const entry = await Entry.findById(id)
    //   res.send(entry)
    // } catch (err) {
    //   res.status(400).send(err)
    // }
}

exports.deleteEntry = async (req, res) => {
    // const { id } = req.params;

    // try {
    //   const entry = await Entry.findByIdAndDelete(id)
    //   res.send(entry)
    // } catch (err) {
    //   res.status(400).send(err)
    // }
}