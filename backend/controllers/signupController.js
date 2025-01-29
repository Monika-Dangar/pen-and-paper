const writerService = require('../services/writerService')

function handleWriterSignup(req, res) {
    try {

        const data = {
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio ? req.body.bio : null,
            profileImagePath: req.body.profileImagePath ? req.body.profileImagePath : null
        }

        const newWriter = writerService.createWriter(data)

        if (newWriter) {
            return res.status(201).send({ message: "Writer created", writer: newWriter })
        }

        return res.status(400).send({ message: `Issue in signup` })

    } catch (error) {
        console.log(`Error while creating writer: ${error}`)
        return res.status(500).send({ message: error });
    }
}

module.exports = { handleWriterSignup }