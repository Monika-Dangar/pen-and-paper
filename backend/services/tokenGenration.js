const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY

function setUserAuth(user) {
    return jwt.sign(user, secret);
}

function getUserAuth(token) {
    // return jwt.verify(token, secret);
    try {
        // Verify and decode the token in a single step
        const decoded = jwt.verify(token, secret);
        return decoded; // Return decoded token content (e.g., user data)
    } catch (err) {
        throw new Error('Invalid token'); // Will be caught by the caller (authenticate function)
    }

}

module.exports = {
    setUserAuth,
    getUserAuth,
}