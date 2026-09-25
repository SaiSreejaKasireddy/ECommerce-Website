const { getAllUsers,getUserById } =require("../models/userModel");


async function fetchAllUsers(){
    const users=await getAllUsers();
    return users;
}
async function fetchUserById(id){
    const user=await getUserById(id);
    return user;
}

// postuser updateuser deleteuser

module.exports={
    fetchAllUsers,
    fetchUserById

};