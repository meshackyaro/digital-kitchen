export const authorize = (...alloweRoles) => (req, res, next) => {

    const userRole = req.user.role;

    if (!req.user) res.status(401).json({
        status: "ERROR",
        message: "Unauthorized"
    });

    if (!alloweRoles.includes(userRole)) res.status(403).json({
        status: "ERROR",
        message: "Access denied"
    });

    next();
};