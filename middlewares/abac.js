module.exports = (department) => {
    return (req, res, next) => {
        if(req.user.department !== department) {
            return res.status(403).json({ error: 'Access denied for this department' });
        }
        next();
    };
};