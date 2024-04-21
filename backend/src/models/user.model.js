import mongoose from "mongoose";

//Creating user Schema (A set of rules for our user Model)
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true, //Adds CreatedAt and updatedAt fields
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

export default User;