const {fetchAllCategories,addCategory}=require("../services/categoryService");
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



//put

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
module.exports={
    getCategories,
    createCategory
};