const { getAllCategories,getCategoryByName,createCategory,updateCategory,deleteCategory}=require("../models/categoryModel");
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


//put
async function editCategory(id,categoryData){
    const {name}=categoryData;
    if(!name || !name.trim()){
        const error=new Error("category name is required");
        error.statusCode=400;
        throw error;
    }

    const existingCategory=await getAllCategories();
    const category=existingCategory.find(
        category =>category.id===Number(id)
    );
    if(!category){
        const error=new Error("Category not found");
        error.statusCode=404;
        throw error;
    }
    const categoryWithSameName=await getCategoryByName(name);
    if(
        categoryWithSameName && 
        categoryWithSameName.id!==Number(id)
    ){
        const error=new Error("Category already exists");
        error.statusCode=409;
        throw error;
    }
    const result=await updateCategory(id,categoryData);
    return result;

}



//delete

async function removeCategory(id){
    const categories=await getAllCategories();
    const category=categories.find(
        category=>category.id ===Number(id)
    );
    if(!category){
        const error=new Error("Category not found");
        error.statusCode=404;
        throw error;
    }
    const result =await deleteCategory(id);
    return result;
}


module.exports={
    fetchAllCategories,
    addCategory,
    editCategory,
    removeCategory
};