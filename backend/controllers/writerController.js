const Writer = require('../models/writer')
const writerService = require('../services/writerService')

async function handleGetWriter(req, res) {
    try {

        const { username } = req.user;

        const writerData = await writerService.findUser(username)

        if (!writerData) {
            return res.status(404).send({ message: 'Writer not found' });
        }

        return res.status(200).send({ message: "sending resp from writer - handleGetWriter", writerData });
    } catch (error) {
        console.error('Error fetching writer data:', error);
        return res.status(500).send({ message: 'Error fetching writer data' });
    }
}

async function handleModifyWriter(req, res) {
    const { writerId, username, password, bio, profileImagePath } = req.body;

    try {
        const writer = await Writer.findById(writerId);

        let modified = false;
        const updatedFields = {};

        if (username && writer.username !== username) {
            updatedFields.username = username;
            modified = true;
        }

        if (password && writer.password !== password) {
            updatedFields.password = password;
            modified = true;
        }

        if (bio && writer.bio !== bio) {
            updatedFields.bio = bio;
            modified = true;
        }

        if (profileImagePath && writer.profileImagePath !== profileImagePath) {
            updatedFields.profileImagePath = profileImagePath;
            modified = true;
        }

        if (!modified) {
            return res.status(400).json({ message: 'No changes detected' });
        }

        const updatedWriter = await Writer.findByIdAndUpdate(writerId, updatedFields, { new: true });

        res.status(200).json({
            message: 'Writer data updated successfully',
            writer: updatedWriter
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating writer', error });
    }

}

async function handleFindOtherWriter(req, res) {

    try {

        const { username } = req.user;
        // console.log(`username: ${username}`);

        const { writerUsername } = req.params;
        // console.log(`writerUsername: ${writerUsername}`);

        const writer = await writerService.findUser(username)

        const regex = new RegExp(writerUsername, 'i');
        // console.log(`regex: ${regex}`);

        const response = await writerService.findOtherWriterByUsername(regex)

        if (!response) {
            return res.status(404).send({ message: 'Writer not found' });
        }

        return res.status(200).send({ message: "Other writers data", response });
    } catch (error) {
        console.error('Error fetching writer data:', error);
        return res.status(500).send({ message: 'Error fetching writer data' });
    }
}

module.exports = {
    handleGetWriter,
    handleModifyWriter,
    handleFindOtherWriter
}