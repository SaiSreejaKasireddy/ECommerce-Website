const bcrypt = require("bcrypt");
const { getAllUsers,getUserById,getUserByEmail,createUser } =require("../Models/userModel");
const {ValidateUser}=require("../Validation/userValidation");

async function fetchAllUsers(){
    const users=await getAllUsers();
    return users;
}
async function fetchUserById(id){
    const user=await getUserById(id);
    return user;
}

async function fetchUserByEmail(email){
    const user=await getUserByEmail(email);
    return user;
}
// postuser updateuser deleteuser



async function addUser(userData) {
    const validationError = ValidateUser(userData);

    if (validationError) {
        throw new Error(validationError);
    }
    const existingUser = await getUserByEmail(userData.email);

    if (existingUser) {
        const error = new Error("Email already registered");
        error.statusCode = 409;
        throw error;
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const userWithHashedPassword = {
        ...userData,
        password: hashedPassword
    };

    const userId = await createUser(userWithHashedPassword);

    return userId;
}



module.exports={
    fetchAllUsers,
    fetchUserById,
    fetchUserByEmail,
    addUser

};