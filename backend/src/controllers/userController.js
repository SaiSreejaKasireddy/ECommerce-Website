const {fetchAllUsers,fetchUserById,fetchUserByEmail,addUser,editUser,removeUser} = require("../services/userService");


async function getUsers(req,res,next){
    try{
        const users=await fetchAllUsers();
        // console.log(users)
        res.status(200).json({
            success:true,
            data:users
        });
    }
    catch(error){
      /*  console.error(error);
        res.status(500).json({
            success:false,
            message:"Failed to fetch users"
        });*/
        next(error);
    }
}
async function getUserById(req,res,next){
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
       /* console.error(error);
        res.status(500).json({
            success:false,
            message:"Failed to fetch user"
        })*/
       next(error);
    }
}

async function getUserByEmail(req,res,next){
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
       /* console.error(error);
        res.status(500).json({
            success:false,
            message:"Failed to fetch user"
        });*/
        next(error);
    }
}
// postuser , updateuser , deleteuser

async function createUser(req,res,next){
    try{
        const userId=await addUser(req.body);
        res.status(201).json({
            success:true,
            message:"User  created successfully",
            userId:userId
        });

    }
    catch(error){
       /* console.error(error);
        if (error.statusCode) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        });
    }
        res.status(500).json({
            success:false,
            message:"Failed to create user"
        })*/
       next(error);
    }
}


//put method
async function updateUser(req,res,next){
    try{
        console.log("UPDATE USER ID:", req.params.id);
        console.log("UPDATE USER BODY:", req.body);
        const result=await editUser(req.params.id,req.body);
        res.status(200).json({
            success:true,
            message:"User updated successfully",
            affectedRows:result.affectedRows
        });
    }
    catch(error){
      /*  console.error(error);
        if(error.statusCode){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message
            });
        }
        res.status(500).json({
            success:false,
            message:"Failed to update user"
        });*/
        next(error);
    }
}

//delete
async function deleteUser(req,res,next){
    try{
         const result=await removeUser(req.params.id);
         res.status(200).json({
            success:true,
            message:"deleted successfully",
            affectedRows:result.affectedRows
         });
    }
    catch(error){
       /* console.error(error);
        if(error.statusCode){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message
            });
        }
        res.status(500).json({
            success:false,
            message:"Failed to delete user"
        });*/
        next(error);
    }
}


module.exports={
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};