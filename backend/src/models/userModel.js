const con=require("../config/db");


async function getAllUsers(){
    const [rows]=await con.promise().query(
        "SELECT * FROM users"
    );
    return rows;
}
async function getUserById(id){
    const [rows]=await con.promise().query(
        "SELECT * FROM users WHERE id =?",
        [id]
    );
    return rows[0];
}
async function getUserByEmail(email){
    const [rows]=await con.promise().query(
        "SELECT * FROM users WHERE email =?",
        [email]
    );
    return rows[0];
}
// insert values(), update table set parameter where condition , delete table where condition


//user by post
async function createUser(userData){
    const {
        first_name,
        last_name,
        email,
        password,
        phone
    }=userData;
    const [result]=await con.promise().query(
        `INSERT INTO users (first_name,last_name,email,password,phone)
        VALUES(?,?,?,?,?)`,
        [first_name,last_name,email,password,phone]
    );
    return result.insertId;
}



module.exports={
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser
};