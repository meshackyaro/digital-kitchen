export const registerUserService = async (identifier, password) => {

    const normalizeIdentifier = identifier.trim().toLowerCase();

    const existingUser = UserActivation.findOne({
        $or: [
            {email: normalizeIdentifier}, 
            {phone: normalizeIdentifier}
        ]
    });

    if (existingUser) throw new AppError("User aready exist", 409);

    const hashedPassword = await bcrypt.hash(password,10);

    const user = 

    
}