const bcrypt = require('bcrypt');

async function hashPassword(req, res, next) {

    const { password } = req.body;

    if (!password) {
        return res.status(400).send({ message: "Password missing!" })
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.log(`Error in hashing password: ${err}`);;
            return res.status(500).send({ message: 'Error in hashing password', err })

        }
        req.body.password = hashedPassword;
        next();
    })
}

module.exports = {
    hashPassword
}