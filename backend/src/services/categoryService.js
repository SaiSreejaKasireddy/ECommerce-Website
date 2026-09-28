const { getAllCategories,getCategoryByName,createCategory}=require("../models/categoryModel");
async function fetchAllCategories(){
    const categories=await getAllCategories();
    return categories;
}
//put
async function addCategory(categoryData){
    const {name}=categoryData;
    if(!name || !name.trim()){
        const error=new Error("Category name is required");
        error.statusCode=400;
        throw error;
    }
    const existingCategory=await getCategoryByName(name);
    if(existingCategory){
        const error=new Error("Category already exists");
        error.statusCode=409;
        throw error;
    }
    const categoryId=await createCategory(categoryData);
    return categoryId;
}




module.exports={
    fetchAllCategories,
    addCategory
};