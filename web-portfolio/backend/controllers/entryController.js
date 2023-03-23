const connection = require('../config/db');
const db = connection.useDb('portfolio');
const Entry = require('../models/entry');
const cloudinary = require('../config/cloudinaryConfig');
const upload = require('../config/multerConfig');

exports.createEntry = async (req, res) => {
    const { title, caption } = req.body;

    // Handle single file upload
    const thumbnail = req.file;
    const thumbnailPath = thumbnail.path;
  
    // Handle multiple file upload
    const images = req.files;
    const imagePaths = images.map(image => image.path);
  
    try {
        // Upload the thumbnail and images to Cloudinary
        const uploadPromises = [cloudinary.uploader.upload(thumbnailPath)];
        imagePaths.forEach(image => uploadPromises.push(cloudinary.uploader.upload(image)));
  
        // Wait for all uploads to complete and extract the URLs
        const uploadResults = await Promise.all(uploadPromises);
        const thumbnailUrl = uploadResults[0].secure_url;
        const imageUrls = uploadResults.slice(1).map(result => result.secure_url);
  
        // Save the new entry to the database
        const entry = new Entry({
            title,
            thumbnail: thumbnailUrl,
            caption,
            images: imageUrls
        });
        await entry.save();
  
        res.status(201).send(entry);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
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
    // const { id } = req.params

    // try {
    //   const entry = await Entry.findByIdAndDelete(id)
    //   res.send(entry)
    // } catch (err) {
    //   res.status(400).send(err)
    // }
}
