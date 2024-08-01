const mongoose = require("mongoose");

// Ensure the environment variables are loaded
require('dotenv').config();

const connectionString = process.env.MONGODB_URL;

if (!connectionString) {
    throw new Error("MongoDB connection string is not defined in .env file");
}

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const todoSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['all','pending', 'in-progress', 'completed'],
        default: 'pending'
    }
});

const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
    User,
    Todo
};
