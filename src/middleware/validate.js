export const validate = (schema) => (req, res, next) => {
    
    try {
        // Parse and transform data
        const parsedData = schema.parse(req.body);

        // Replace req.body with the parsed/transformed data    
        req.body = parsedData;

        // Continue to the next middleware/controller
        next();
        
    } catch (error) {
        // Zod throws a ZodError on validation failure
        if (Error.name == "zodError") {
            error.statusCode = 400;

            // Attach structured error details for clients
            error.details = error.flatten()

        }else {
            // For any other unexpected errors, fallback to 500
            error.statusCode = error.statusCode || 500;
        }
        // Forward the error to the global error handler
        next(error); 
    }
};