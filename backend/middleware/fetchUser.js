const jwt = require('jsonwebtoken');
const JWT_SECRET = "amantiwariisbestcoder";

const fetchUser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token'); // sending header auth-token along with request
    if(!token) {
        res.status(401).send({error : "Please authenticate using a valid token"});
    }
    
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    
    catch(err) {
        res.status(401).send({error : "Please authenticate using a valid token"});
    }
}


module.exports = fetchUser;