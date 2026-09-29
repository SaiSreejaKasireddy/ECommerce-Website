const {fetchAllCategories,addCategory,editCategory,removeCategory}=require("../services/categoryService");
async function getCategories(req,res){
    try{
        const categories=await fetchAllCategories();
        res.status(200).json({
            success:true,
            data:categories
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Failed to fetch categories"
        });
    }
}



//post

async function createCategory(req,res){
    try{
        const categoryId=await addCategory(req.body);
        res.status(201).json({
            success:true,
            message:"Category created successfully",
            categoryId:categoryId
        });
    }
    catch(error){
        console.error(error);
        if(error.statusCode){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message
            });
        }
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}



//put

async function updateCategory(req,res){
    try{
        const categoryId=req.params.id;
        const result=await editCategory(
            categoryId,
            req.body
        );
        res.status(200).json({
            success:true,
            message:"Category updated successfully"
        });
    }
    catch(error){
        console.error(error);
        if(error.statusCode){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message
            });

        }
        res.status(500).json({
            success:false,
            message:"Failed to update category"
        });
    }
}
//delete


async function deleteCategory(req,res){
    try{
        const categoryId=req.params.id;
        await removeCategory(categoryId);
        res.status(200).json({
            success:true,
            message:"Category deleted successfully"
        });
    }
    catch(error){
        console.error(error);
        if(error.statusCode){
            return res.status(error.statusCode).json({
                success: false,
                message:error.message
            });
        }
        res.status(500).json({
            success:false,
            message:"Failed to delete category"
        });
    }
}




module.exports={
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};