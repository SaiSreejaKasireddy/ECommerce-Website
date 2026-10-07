const {fetchAllProducts,fetchProductById,addProduct,editProduct,removeProduct}=require("../services/productService");

async function getProducts(req,res,next){
    try{
        const products=await fetchAllProducts();
        res.status(200).json({
            success:true,
            data:products
        });
    }
    catch(error){
        next(error);
    }
}

async function getProductById(req, res, next) {
    try {
        const productId = req.params.id;

        const product = await fetchProductById(productId);

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
}
async function createProduct(req,res,next){
    try{
        const productId=await addProduct(req.body);
        res.status(201).json({
            success:true,
            message:"Product created Suceessfully",
            productId:productId
        });
    }
    catch(error){
        next(error);
    }
}


async function updateProduct(req,res,next){
    try{
        const productId=req.params.id;
        await editProduct(productId,req.body);
        res.status(200).json({
            success:true,
            message:"Product updated successfully"
        });
    }
    catch(error){
        next(error);
    }
}

async function deleteProduct(req,res,next){
    try{
        const productId=req.params.id;
        await removeProduct(productId);
        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        });
    }
    catch(error){
        next(error);
    }
}


module.exports={
    getProducts,
     getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};