export const authorize = (...allowedRoles) => (req, res, next) => {

    if (!req.user) return res.status(401).json({
        status: "ERROR",
        message: "Unauthorized"
    });

    if (!allowedRoles.includes(req.user.role)) return res.status(403).json({
        status: "ERROR",
        message: "Access denied"
    });

    next();
};