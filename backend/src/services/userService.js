const { getAllUsers } =require("../models/userModel");
async function fetchAllUsers(){
    const users=await getAllUsers();
    return users;
}
module.exports={
    fetchAllUsers
};