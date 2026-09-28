const { getAllCategories}=require("../models/categoryModel");
async function fetchAllCategories(){
    const categories=await getAllCategories();
    return categories;
}
module.exports={
    fetchAllCategories
};