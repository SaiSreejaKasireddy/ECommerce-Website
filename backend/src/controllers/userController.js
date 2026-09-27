const {fetchAllUsers,fetchUserById,fetchUserByEmail,addUser} = require("../services/userService");


async function getUsers(req,res){
    try{
        const users=await fetchAllUsers();
        // console.log(users)
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

async function getUserByEmail(req,res){
    try{
        const user=await fetchUserByEmail(req.params.email);
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
        });
    }
}
// postuser , updateuser , deleteuser

async function createUser(req,res){
    try{
        const userId=await addUser(req.body);
        res.status(201).json({
            success:true,
            message:"User  created successfully",
            userId:userId
        });

    }
    catch(error){
        console.error(error);
        if (error.statusCode) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        });
    }
        res.status(500).json({
            success:false,
            message:"Failed to create user"
        })
    }
}



module.exports={
    getUsers,
    getUserById,
    getUserByEmail,
    createUser
};