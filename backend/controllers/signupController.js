const writerService = require('../services/writerService')

async function handleWriterSignup(req, res) {
    try {

        if (!req.body.username || !req.body.password) {
            return res.status(400).send({ message: `Issue in signup` })
        }
        const data = {
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio ? req.body.bio : null,
            profileImagePath: req.body.profileImagePath ? req.body.profileImagePath : null
        }

        const usernameExists = await writerService.findUser(req.body.username)

        if (usernameExists.success) {
            return res.send({ success: false, message: 'Username already exists' })
        }

        const newWriter = await writerService.createWriter(data)

        if (newWriter) {
            return res.status(201).send({ success: true, message: "Writer created", writer: newWriter })
        }

        return res.status(400).send({ message: `Issue in signup` })

    } catch (error) {
        console.log(`Error while creating writer: ${error}`)
        return res.status(500).send({ message: error });
    }
}

module.exports = { handleWriterSignup }