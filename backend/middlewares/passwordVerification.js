const bcrypt = require('bcrypt');
const Writer = require('../models/writer')

async function passwordVerification(req, res, next) {

    const { username, password } = req.body;

    console.log(`username: ${username} & ${password}`);
    try {
        const user = await Writer.findOne({ username: username });

        if (!user) {
            return res.status(401).send({ message: `User doesn't exists with this username!` });
        }

        console.log(`user found`);

        const isWriterVerified = await bcrypt.compare(password, user.password);

        // console.log(`isWriterVerified: ${isWriterVerified}`);
        if (!isWriterVerified) {
            return res.status(401).send({ message: `Invalid password!` });
        }


        req.user = user;
        next();

    } catch (error) {
        console.log(`Error in password verification: ${error} `);
        return res.status(500).send({ message: `Error in password verification: ${error}` })
    }

}

module.exports = {
    passwordVerification
}