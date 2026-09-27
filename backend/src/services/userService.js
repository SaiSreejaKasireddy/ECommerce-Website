const { getAllUsers,getUserById,getUserByEmail } =require("../models/userModel");


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

module.exports={
    fetchAllUsers,
    fetchUserById,
    fetchUserByEmail

};