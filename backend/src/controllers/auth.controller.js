import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const signupController = async (req, res, next) => {
    try {
        //Extract user input from request body
        const { username, password, email } = req.body;

        if (!username || !email || !password) {
            // return res.status(400).json({
            //     success: false,
            //     message: "All fields are required"
            // })
            return next(errorHandler(400, "All fields are required"));
        }

        //Check if the user already exists
        const userAlreadyExist = await User.findOne({ $or: [{ username }, { email }] })
        if(userAlreadyExist) {
            // return res.status(400).json({
            //     success: false,
            //     message: "Username or email already exists"
            // })
            return next(errorHandler(400, "Username or email already exists"));
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
        next(error);
    }
}

export const signinController = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        next(errorHandler(400, "All fields are required"));
    }

    try {
        const validUser = await User.findOne({ email });

        if(!validUser) {
            return next(errorHandler(400, "Invalid username or password"))
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if(!validPassword) {
            return next(errorHandler(400, "Invalid username or password"))
        }

        //Creating JWT Token for authentication

        /*if the user is valid, then we (server) will generate a JWT Token containing user information (e.g. userId, username, roles) and sign it with a secret key.
        
        This JWT is then sent back to the client as part of the authentication response.
        
        Token Storage: The client receives the JWT and stores it securely, typically in a local storage, session storage or cookies.

        Token Sending: For subsequent (further) requests to protected resources, the client includes the JWT in the request headers, typically in the `Authorization` header with the `Bearer` scheme.

        Token Verification:
        1. The server receives the request with the JWT in the headers.
        2. The server verifies the JWT's signature using the same secret key that was used to sign it during authentication.
        3.If the signature is valid, the server decodes the JWT to extract the user information and perform any necessary authorization checks.
        4. If the JWT is invalid (e.g., expired, tampered with, or signed with an incorrect key), the server denies access and returns an authentication error.
        */

        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        )

        //User details to send in response
        const { password: pass, createdAt, updatedAt, __v, ...rest } = validUser._doc;

        //Sending JWT Token in the response cookie
        res.status(200).cookie(
            'access_token',     //cookie name
            token,              //cookie value
            {
                httpOnly: true,
                /* httpOnly: true: This ensures that the cookie is only accessible via HTTP(S) requests and cannot be accessed by client-side JavaScript, enhancing security against certain types of attacks like XSS.*/
                
                secure: true,
                /* This indicates that the cookie should only be sent over HTTPS connections, preventing it from being transmitted over insecure channels.*/
            }
        ).json(rest);

    } catch (error) {
        next(error);
    }
} 
