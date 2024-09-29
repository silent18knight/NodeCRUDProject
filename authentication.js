const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token) {
        return res.status(403).json({message: 'no token present'});
    }

    jwt.verify(token, 'my_secret', (err, user) => {
        if(err) return res.status(403).json({message: 'wrong credentials'});
        req.user = user;
        next();
    });
}

module.exports = authenticate;