const con=require("../config/db");
async function getAllCategories(){
    const [rows]=await con.promise().query(
        "SELECT * FROM categories"
    );
    return rows;
}

async function getCategoryByName(name) {
    const [rows] = await con.promise().query(
        "SELECT * FROM categories WHERE name = ?",
        [name]
    );

    return rows[0];
}

//post
//post
async function createCategory(categoryData){
    const {
        name,description
    }=categoryData;

const [result]=await con.promise().query(
    `INSERT INTO categories (name,description)
    VALUES (?,?)`,
    [name,description]
);
return result.insertId;
}

//put


async function updateCategory(id,CategoryData){
    const {name,description}=CategoryData;
    const [result]=await con.promise().query(
        `UPDATE categories SET name=?,
        description=?
        WHERE id=?`,
        [name,description,id]
    );
    return result;
}





//delete

async function deleteCategory(id){
    const [result]=await con.promise().query(
        "DELETE FROM categories WHERE id=?",
        [id]
    );
    return result;
}
module.exports={
    getAllCategories,
    createCategory,
    getCategoryByName,
    updateCategory,
    deleteCategory
}

