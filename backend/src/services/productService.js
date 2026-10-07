const {
    getAllProducts,createProduct,getProductsById,updateProduct,deleteProduct
}=require("../models/productModel");


async function fetchAllProducts(){
    const products=await getAllProducts();
    return products;
}


async function addProduct(productData){
    const{
        category_id,
        name,
        description,price,stock,image_url
    }=productData;

    if(!category_id || !name || !price){
        const error=new Error("Category,product name and price are required");
        error.statusCode=400;
        throw error;
    }
    if(price<=0){
        const error=new Error("Price must be greater than 0");
        error.statusCode=400;
        throw error;
    }
    if(stock<0){
        const error=new Error("Stock cannot be negative");
        error.statusCode=400;
        throw error;
    }
    const productId=await createProduct({
        category_id,
        name,
        description,
        price,
        stock,
        image_url
    });
    return productId;
}

async function fetchProductById(id){
    const product=await getProductsById(id);
    if(!product){
        const error=new Error("Product not found");
        error.statusCode=404;
        throw error;
    }
    return product;
}


async function editProduct(id,productData){
    const{
category_id,
name,
description,
price,
stock,
image_url
    }=productData;
    if(!category_id || !name || !price){
        const error=new Error(
            "Category,product name and price are required"
        );
        error.statusCode=400;
        throw error;
    }
    if(price<=0){
        const error=new Error("Price must be greater than 0");
        error.statusCode=400;
        throw error;
    }
    if(stock<0){
        const error=new Error("Stock cannot be negative ");
        error.statusCode=400;
        throw error;
    }
    
    const existingProduct =await getProductsById(id);
    if(!existingProduct){
        const error =new Error("Product not found");
        error.statusCode=404;
        throw error;
    }
    const result=await updateProduct(id,{
        category_id,
        name,
        description,
        price,
        stock,
        image_url
    });
    return result;
}

async function removeProduct(id){
    const existingProduct=await getProductsById(id);
    if(!existingProduct){
        const error=new Error("Product not found");
        error.statusCode=404;
        throw error;
    }
    const result=await deleteProduct(id);
    return result;
}


module.exports={
    fetchAllProducts,
    addProduct,
    fetchProductById,
    editProduct,
    removeProduct
};