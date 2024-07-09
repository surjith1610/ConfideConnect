import User from "../models/user.js";
import Patient from "../models/patient.js";
import Doctor from '../models/doctor.js'
import Lab from '../models/lab.js'
import MedicalRequest from "../models/medicalrequest.js";
import LabRequest from '../models/labrequest.js';
import Event from '../models/event.js';
import Blog from '../models/blog.js'
import ResetToken from "../models/resettoken.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Create User
/**
 * Saves a new user object to the database,
 * then adds an entry to the respective document based on role
 * @param {Object} user The user data to create a new document.
 * @returns {Promise<Object>} A promise that resolves to the newly created user document.
 */
export const createUser = async (user) => {
    if (user.role == "patient") {
        // 1. create user
        // 2. create blank entry in patient
        let savedUser = {}
        try {
            const newUser = new User(user);
            savedUser = await newUser.save();
        } catch (error) {
            console.error('Error creating user:', error.message);
            return null;
        }
        try {
            const newPatient = new Patient({ patientId: savedUser._id });
            await newPatient.save();
        } catch (error) {
            console.error('Error creating patient:', error.message);
            return null;
        }
        return savedUser;
    }
    if (user.role == "doctor") {
        // 1. create user
        // 2. create blank entry in doctor
        let savedUser = {}
        try {
            const newUser = new User(user);
            savedUser = await newUser.save();
        } catch (error) {
            console.error('Error creating user:', error.message);
            return null;
        }
        try {
            const newDoctor = new Doctor({ doctorId: savedUser._id });
            await newDoctor.save();
        } catch (error) {
            console.error('Error creating doctor:', error.message);
            return null;
        }
        return savedUser;
    }
    if (user.role == "lab") {
        // 1. create user
        // 2. create blank entry in lab
        let savedUser = {}
        try {
            const newUser = new User(user);
            savedUser = await newUser.save();
        } catch (error) {
            console.error('Error creating user:', error.message);
            return null;
        }
        try {
            const newLab = new Lab({ labId: savedUser._id });
            await newLab.save();
        } catch (error) {
            console.error('Error creating lab:', error.message);
            return null;
        }
        return savedUser;
    }
    if (user.role == "admin") {
        // 1. create user
        let savedUser = {}
        try {
            const newUser = new User(user);
            savedUser = await newUser.save();
        } catch (error) {
            console.error('Error creating user:', error.message);
            return null;
        }
        return savedUser;
    }
};

// Get All
/**
 * Retrieves all notes
 * @param {*} params 
 * @returns 
 */
export const getAll = async () => {
    const users = await User.find();
    return users;
}

/**
 * Updates a single user object based on its ID.
 * @param {String} userId - The ID of the user to update.
 * @param {Object} updatedUserData - The data to update in the user's document.
 * @returns {Promise<Object>} A promise that resolves to the updated user document, or null if no document was found.
 */
export const updateUser = async (userId, updatedUserData) => {
    const uodatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    return uodatedUser;
};

/**
 * Deletes user and linked entries in all documents
 * @param {String} userId The ID of the user to delete.
 * @returns {Promise<Object>} A promise that resolves to the result of the deletion operation.
 */
export const deleteUser = async (userId) => {
    const user = await User.findById(userId);
    if (user.role == "patient") {
        // 1. delete linked medical requests
        // 2. delete linked lab requests
        // 3. delete patient
        // 4. delete user
        await MedicalRequest.deleteMany({ patientId: userId })
        await LabRequest.deleteMany({ patientId: userId })
        await Patient.deleteOne({ patientId: userId });
        const userDeletionResult = await User.findByIdAndDelete(userId);
        return userDeletionResult;
    }
    if (user.role == "doctor") {
        // 1. delete linked medical requests
        // 2. delete linked events 
        // 3. delete linked blogs 
        // 4. delete doctor
        // 5. delete user
        await MedicalRequest.deleteMany({ doctorId: userId })
        await Event.deleteMany({ creatorId: userId })
        await Blog.deleteMany({ creatorId: userId });
        await Doctor.deleteOne({ doctorId: userId });
        const userDeletionResult = await User.findByIdAndDelete(userId);
        return userDeletionResult;
    }
    if (user.role == "lab") {
        // 1. delete linked lab requests
        // 2. delete linked events 
        // 3. delete linked blogs 
        // 4. delete lab
        // 5. delete user
        await LabRequest.deleteMany({ labId: userId })
        await Event.deleteMany({ creatorId: userId })
        await Blog.deleteMany({ creatorId: userId });
        await Lab.deleteOne({ labId: userId });
        const userDeletionResult = await User.findByIdAndDelete(userId);
        return userDeletionResult;
    }

    if (user.role == "admin") {
        // Delete admin
       const userDeletionResult = await User.findOne({_id:userId});
        return userDeletionResult;
    }
};

/**
 * Deletes all users
 * @returns {Promise<Object>} A promise that resolves to the result of the deletion operation.
 */
export const deleteAll = async() => {
    // 1. delete all patients
    // 2. delete all doctors
    // 3. delete all labs
    // 4. delete all medical requests
    // 5. delete all lab requests
    // 6. delete all events
    // 7. delete all blogs
    // 8. delete all users

    await LabRequest.deleteMany();
    await MedicalRequest.deleteMany();
    await Event.deleteMany();
    await Blog.deleteMany();
    await Patient.deleteMany();
    await Doctor.deleteMany();
    await Lab.deleteMany();
    

    const users = await User.deleteMany();
    return users;
}

export const deleteAllPatients = async () => {
    try {
        const patients = await Patient.find();
        for (const patient of patients) {
            await Patient.findByIdAndDelete(patient._id);
            await User.findByIdAndDelete(patient.patientId);
        }
        return { success: true, message: "All patients and their associated users deleted successfully" };
    } catch (error) {
        console.error("Error deleting patients:", error.message);
        throw error; 
    }
}

export const deleteAllDoctors = async () => {
    try {
        const doctors = await Doctor.find();
        for (const doctor of doctors) {
            await Doctor.findByIdAndDelete(doctor._id);
            await User.findByIdAndDelete(doctor.doctorId);
        }
        return { success: true, message: "All doctors and their associated users deleted successfully" };
    } catch (error) {
        console.error("Error deleting doctors:", error.message);
        throw error; 
    }
}

export const deleteAllLabs = async () => {
    try {
        const labs = await Lab.find();
        for (const lab of labs) {
            await Lab.findByIdAndDelete(lab._id);
            await User.findByIdAndDelete(lab.labId);
        }
        return { success: true, message: "All labs and their associated users deleted successfully" };
    } catch (error) {
        console.error("Error deleting labs:", error.message);
        throw error; 
    }
}

/**
 * Retrieves a single user object by ID.
 * @param {String} userId The unique identifier for the user.
 * @returns {Promise<Object>} A promise that resolves to a user object, or null if not found.
 */
export const getById = async (userId) => {
    const user = await User.findById(userId);
    return user;
}

export const loginUser = async (username, password) => {
    try {
        const user = await User.findOne({username: username, password: password});
        if(!user) {
            return { success: false, message: "Invalid username/password"}
        }
        const accessToken = jwt.sign({ userId: user.id }, process.env.SECRET_ACCESS_KEY, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ userId: user.id }, process.env.SECRET_REFRESH_KEY, { expiresIn: '2 days' });
        return { success: true, accessToken: accessToken, refreshToken: refreshToken, role: user.role, userId: user.id }
    } catch (error) {
        console.error("Error while validating user:", error.message);
        throw error; 
    }
}

export const refreshUserToken =  async (refreshToken) => {
    if (refreshToken == null) return { success: false, message: "Refresh Token required" };
    try {
        const decodedToken = jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY);
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return { success: false, message: "Invalid refresh token" };
        }
        const newAccessToken = jwt.sign({ userId: user.id }, process.env.SECRET_ACCESS_KEY, { expiresIn: '1h' });
        const newRefreshToken = jwt.sign({ userId: user.id }, process.env.SECRET_REFRESH_KEY, { expiresIn: '2 days' });
        return { success: true, accessToken: newAccessToken, refreshToken: newRefreshToken }
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return { success: false, message: "Invalid refresh token" };
        } else {
            console.error("Error while refreshing token:", error)
            throw error;
        }
    }
}

export const getResetToken =  async (email) => {
    if (email == null) return { success: false, message: "Email required" };
    try {
        const user = await User.findOne({"email": email});
        if (!user) {
            return { success: false, message: "No such user found" };
        }
        await ResetToken.deleteMany({"userId": user.id});
        const newToken = crypto.randomBytes(100).toString('hex');
        const tokenObject = new ResetToken({"userId": user.id, "token": newToken});
        await tokenObject.save()
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_EMAIL_APP_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: "Password Reset",
            text: `To reset your password, click on this link: ${process.env.URL}/reset/${newToken}`
        });
        return { success: true }
    } catch (error) {
        console.error("Error while getting reset token:", error)
        throw error;
    }
}

export const resetPassword = async (resetToken, password) => {
    // username can be changed too
    if (password == null) return { success: false, message: "Password required" };
    if (resetToken == null) return { success: false, message: "Reset Token required" };
    try {
        const tokenObject = await ResetToken.findOne({'token': resetToken});
        if (!tokenObject ) {
            return { success: false, message: "Invalid reset token" };
        }
        if (tokenObject.expiryAt < Date.now()) {
            return { success: false, message: "Reset token expired" };
        }
        const user = await User.findById(tokenObject.userId);
        user.password = password;
        await user.save()
        await ResetToken.deleteOne({ _id: tokenObject._id });
        return { success: true, message: "Password reset successfull" }
    } catch (error) {
        console.error("Error while reseting password:", error)
        throw error;
    }
}