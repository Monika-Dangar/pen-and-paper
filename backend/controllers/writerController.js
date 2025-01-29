const Writer = require('../models/writer')

async function handleGetWriter(req, res) {
    try {

        const { username } = req.user; // Access the decoded username from the request object
        // console.log(`username in handleGetWriter: ${username}`);

        // Fetch the writer data from the database using the username
        const writerData = await Writer.findOne({ username: username }); // Query your DB to find the writer

        if (!writerData) {
            return res.status(404).send({ message: 'Writer not found' });
        }

        // Send the writer data back as a response
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

        // Check if data has changed
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
            // No change to data
            return res.status(400).json({ message: 'No changes detected' });
        }

        // Proceed to update only if changes were made
        const updatedWriter = await Writer.findByIdAndUpdate(writerId, updatedFields, { new: true });

        res.status(200).json({
            message: 'Writer data updated successfully',
            writer: updatedWriter
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating writer', error });
    }

}
module.exports = {
    // handleCreateWriter,
    handleGetWriter,
    handleModifyWriter
}