const { getAllProducts,getProductsById,createProduct,updateProduct,deleteProduct} = require("../src/models/productModel");
const db = require("../src/config/db");

test("getAllProducts should return all products", async () => {
    const products = await getAllProducts();

    expect(Array.isArray(products)).toBe(true);
});


test("getProductById should return the product with given id",async()=>{
    const product=await getProductsById(1);
    expect(product).toBeDefined();
    expect(product.id).toBe(1);
    expect(product.name).toBe("Wireless HeadPhones");
    expect(product.price).toBe("1499.00");

});

test("createProduct should create a new product", async () => {
    const productId = await createProduct({
        category_id: 1,
        name: "Jest Test Product",
        description: "Product created for testing",
        price: 599.00,
        stock: 20,
        image_url: "jest-product.jpg"
    });

    expect(productId).toBeDefined();
});

test("updateProduct should update the product", async () => {
    const productId = await createProduct({
        category_id: 1,
        name: "Jest Update Product",
        description: "Product before update",
        price: 500.00,
        stock: 10,
        image_url: "before.jpg"
    });

    const result = await updateProduct(productId, {
        category_id: 1,
        name: "Updated Jest Product",
        description: "Product after update",
        price: 600.00,
        stock: 20,
        image_url: "after.jpg"
    });

    expect(result.affectedRows).toBe(1);

    await db.promise().query(
        "DELETE FROM products WHERE id = ?",
        [productId]
    );
});

test("deleteProduct should delete the product", async () => {
    const productId = await createProduct({
        category_id: 1,
        name: "Jest Delete Product",
        description: "Product created for delete testing",
        price: 400.00,
        stock: 15,
        image_url: "delete.jpg"
    });

    const result = await deleteProduct(productId);

    expect(result.affectedRows).toBe(1);

    const deletedProduct = await getProductsById(productId);

    expect(deletedProduct).toBeUndefined();
});

afterAll(async () => {
    await db.promise().end();
});