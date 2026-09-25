const {fetchAllUsers,fetchUserById} = require("../services/userService");


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
async function getUserById(req,res){
    try{
        const user=await fetchUserById(req.params.id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        res.status(200).json({
            success:true,
            data:user
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Failed to fetch user"
        })
    }
}

// postuser , updateuser , deleteuser





module.exports={
    getUsers,
    getUserById
};