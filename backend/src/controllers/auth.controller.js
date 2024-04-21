import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signupController = async (req, res) => {
    try {
        //Extract user input from request body
        const { username, password, email } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //Check if the user already exists
        const userAlreadyExist = await User.findOne({ $or: [{ username }, { email }] })
        if(userAlreadyExist) {
            return res.status(400).json({
                success: false,
                message: "Username or email already exists"
            })
        }

        // Hash the password for security (if we use hashSync, we do not need to use await)
        const hashedPassword = bcryptjs.hashSync(password, 10);


        //Create a new User instance if user doesn't already exists
        const newUser = new User({ username, email, password: hashedPassword })

        //Save the new user to the database
        await newUser.save();

        //Return Success Response
        res.status(201).json({ success: true, message: "User created successfully" })
    } catch (error) {
        console.error("Error in Signup: ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
