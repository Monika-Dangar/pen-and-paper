const { getUserAuth } = require('../services/tokenGenration');

async function authenticate(req, res, next) {
    // console.log(req.params);
    // console.log(req.body);


    try {
        const { authorization } = req.headers;

        if (!authorization && !authorization.startsWith("Bearer")) {
            return res.status(400).send({ message: "Authorization token is invalid or missing!" })
        }

        const receivedToken = authorization.split(" ")[1];

        try {
            const decodedToken = getUserAuth(receivedToken);

            // console.log(decodedToken);

            // Attach decoded token info to the request for use in further middleware or route handlers
            req.user = decodedToken;

            // Proceed to the next middleware/handler
            next();
        } catch (err) {
            return res.status(401).send({ message: "Unauthorized - Invalid token!" });
        }

    } catch (error) {

    }
}

module.exports = {
    authenticate
}