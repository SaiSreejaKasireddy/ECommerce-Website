const {fetchAllUsers} = require("../services/userService");
async function getUsers(req,res){
    try{
        const users=await fetchAllUsers();
        res.status(200).json({
            success:true,
            data:users
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Failed to fetch users"
        });
    }
}
module.exports={
    getUsers
};