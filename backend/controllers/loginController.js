const { setUserAuth } = require('../services/tokenGenration');

async function handleWriterLogin(req, res) {

    try {
        const writer = {
            _id: req.body._id,
            username: req.body.username
        }

        const token = setUserAuth(writer)

        if (token) {
            return res.status(200).send({ message: `Writer successfully logged in!!`, token, writer: req.user })
        }

        return res.status(401).send({ message: `Unsuccessful login!` })

    } catch (error) {
        console.log(`Error while logging writer: ${error}`)
        return res.status(500).send({ message: error });
    }
}

module.exports = {
    handleWriterLogin
}