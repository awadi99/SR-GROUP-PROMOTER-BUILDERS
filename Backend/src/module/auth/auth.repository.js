import User from './auth.model.js';

// .lean() add kiya hai for high-speed read operations
export const findUserByEmail = async (email) => {
    return await User.findOne({ email }).lean();
};

// Login ke liye .lean() ke saath +password
export const findUserByEmailForLogin = async (email) => {
    return await User.findOne({ email }).select("+password").lean();
};

export const createUser = async (data) => {
    return await User.create(data);
};

// findById ke liye bhi .lean() use karein agar sirf data read karna hai
export const findUserById = async (userId) => { 
    return await User.findById(userId).lean();
};