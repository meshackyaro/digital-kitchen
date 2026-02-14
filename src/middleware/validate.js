export const validate = (schema) => (req, res, next) => {
    
    try {

        schema.parse(req.body);
        next();
        
    } catch (error) {

        error.statusCode = 400;
        next(error); 
    }
};