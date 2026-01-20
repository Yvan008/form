const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const header = req.headers.authorization;
    
    if (!header) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    // Extract token from "Bearer <token>" format
    const token = header.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ error: 'Token has expired' });
            }
            return res.status(403).json({ error: 'Invalid token' });
        }
        
        // Attach decoded user info to request object
        req.user = decoded;
        next();
    });
};