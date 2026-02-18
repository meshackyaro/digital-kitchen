export const validate = (schema) => (req, res, next) => {
    
    try {
        // Parse and transform data
        const parsedData = schema.parse(req.body);

        console.log("Parsed data in middleware:", parsedData);

        // Replace req.body with the parsed/transformed data    
        req.body = parsedData;

        // Continue to the next middleware/controller
        next();
        
    } catch (error) {
        // Zod throws a ZodError on validation failure
        if (error.name == "ZodError") {
            console.log("Validation error:", error.errors);  // log it

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


// export const validate = (schema) => (req, res, next) => {
//   try {
//     const parsedData = schema.parse(req.body);
//     req.body = parsedData;
//     next();
//   } catch (error) {
//     if (error.name === "ZodError") {
//       return res.status(400).json({
//         status: "ERROR",
//         message: error.errors
//       });
//     }
//     next(error);
//   }
// };
