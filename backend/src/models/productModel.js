const con=require("../config/db");


async function getAllProducts(){
    const [rows]=await con.promise().query(
         `SELECT 
            p.id,
            p.name,
            p.description,
            p.price,
            p.stock,
            p.image_url,
            p.status,
            p.created_at,
            p.updated_at,
            c.id AS category_id,
            c.name AS category_name
        FROM products p
        JOIN categories c
            ON p.category_id = c.id`
    );
return rows;
    
}


async function getProductsById(id){
    const [rows]=await con.promise().query(
        `select 
        p.id,
        p.name,
        p.description,
        p.price,
        p.stock,
        p.image_url,
        p.status,
        p.created_at,
        p.updated_at,
        c.id as category_id,
        c.name as category_name
        from products p
        join categories c
        on p.category_id=c.id
        where p.id=?`,
        [id]
    );
    return rows[0];
}


//post

async function createProduct(productData){
    const{
        category_id,
        name,
        description,
        price,
        stock,
        image_url
    }=productData;
    const [result]=await con.promise().query(
        `insert into products (category_id,name,description,price,stock,image_url)
        values(?,?,?,?,?,?)`,
        [
            category_id,
            name,
            description,
            price,
            stock,
            image_url
        ]
    );
    return result.insertId;
}

async function updateProduct(id,productData){
    const{
        category_id,
        name,
        description,
        price,
        stock,
        image_url
    }=productData;
    const [result]=await con.promise().query(
        `update products set category_id=?,
        name=?,
        description=?,
        price=?,
        stock=?,
        image_url=?
        where id=?`,
        [
            category_id,
            name,
            description,
            price,
            stock,
            image_url,
            id
        ]
    );
    return result;
}

async function deleteProduct(id){
    const [result]=await con.promise().query(
        `delete from products where id=?`,[id]
    );
    return result;
}

module.exports={
    getAllProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
};