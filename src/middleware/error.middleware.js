export const errorHandler = (err, req, res, next) => {
    console.log(err);


    if (res.headersSent) return next(err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: "ERROR",
        message: process.env.NODE_ENV === "production" 
        ? "Internal Server Error" 
        : err.message,
    });
};