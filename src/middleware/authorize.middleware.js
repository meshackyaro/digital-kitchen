export const authorize = (alloweRoles) => (req, res, next) => {
    if (!req.user) res.status(401).json({
        status: "ERROR",
        message: "Unauthorized"
    });

    if (!alloweRoles.includes(req.user.role)) res.status(403).json({
        status: "ERROR",
        message: "Access denied"
    });

    next();
};