// Controller for parsing the incoming data and passing it to the respective functions
import * as userService from './../services//user-service.js';
import { setResponse, setError } from './response-handler.js';


export const createUser = async (request, response) => {
    try {
        const user = { ...request.body };
        const addUser = await userService.createUser(user);
        setResponse(addUser, response);
    }
    catch (error) {
        setError(error, response);
    }
}

export const getAll = async (request, response) => {
    try {
        const users = await userService.getAll();
        setResponse(users, response);
    }
    catch (error) {
        setError(error, response);
    }
}

export const updateUser = async (request, response) => {
    try {
        const updatedUser = { ...request.body };
        const userId = request.params.userId;
        const updateUser = await userService.updateUser(userId, updatedUser);
        setResponse(updateUser, response);
    }
    catch (error) {
        setError(error, response);
    }
}

export const deleteUser = async (request, response) => {
    try {
        const userId = request.params.userId;
        const deletedUser = await userService.deleteUser(userId);
        setResponse(deletedUser, response);
    }
    catch (error) {
        setError(error, response);
    }
}

export const deleteAll = async (request, response) => {
    try{
        const resp = await userService.deleteAll();
        setResponse(resp, response);
    }
    catch (error){
        setError(error, response);
    }
}

export const deleteAllPatients = async (request, response) => {
    try{
        const resp = await userService.deleteAllPatients();
        setResponse(resp, response);
    }
    catch (error){
        setError(error, response);
    }
}

export const deleteAllDoctors = async (request, response) => {
    try{
        const resp = await userService.deleteAllDoctors();
        setResponse(resp, response);
    }
    catch (error){
        setError(error, response);
    }
}

export const deleteAllLabs = async (request, response) => {
    try{
        const resp = await userService.deleteAllLabs();
        setResponse(resp, response);
    }
    catch (error){
        setError(error, response);
    }
}

export const getById = async (request, response) => {
    try {
        const userId = request.params.userId;
        const user = await userService.getById(userId);
        setResponse(user, response);
    }
    catch (error) {
        setError(error, response);
    }
}

export const loginUser = async (request, response) => {
    try {
        const { username, password } = request.body;
        const resp = await userService.loginUser(username, password);
        setResponse(resp, response);
    }
    catch (error) {
        setError(error, response);
    }
}

export const refreshUserToken = async (request, response) => {
    try {
        const refreshToken = request.body.refreshToken;
        const resp = await userService.refreshUserToken(refreshToken);
        setResponse(resp, response);
    }
    catch (error) {
        setError(error, response);
    }
}

// generate a reset token and send it to user email
export const getResetToken = async (request, response) => {
    try {
        const email = request.body.email
        const resetToken = await userService.getResetToken(email);
        setResponse(resetToken, response);
    }
    catch (error) {
        setError(error, response);
    }
}

// reset password to user input new password
export const resetPassword = async (request, response) => {
    try {
        const resetToken = request.params.token;
        const password = request.body.password;
        const resp = await userService.resetPassword(resetToken, password);
        setResponse(resp, response);
    }
    catch (error) {
        setError(error, response);
    }
}
