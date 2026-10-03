const con=require("../config/db");


async function getAllUsers(){
    const [rows]=await con.promise().query(
       `SELECT id, first_name, last_name, email, phone, role, status, created_at, updated_at
 FROM users`
    );
    return rows;
}
async function getUserById(id){
    const [rows]=await con.promise().query(
        `SELECT id, first_name, last_name, email, phone, role, status, created_at, updated_at
         FROM users
         WHERE id = ?`,
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

async function getUserByEmailSafe(email){
    const [rows]=await con.promise().query(
        `SELECT id, first_name, last_name, email, phone, role, status, created_at, updated_at
         FROM users
         WHERE email = ?`,
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


//put method
async function updateUser(id,userData){
    const {
        first_name,
        last_name,
        email,
        phone
    }=userData;
    const [result]=await con.promise().query(
        `UPDATE users 
        SET first_name=?,
        last_name=?,
        email=?,
        phone=?
        WHERE id=?`,
        [first_name,last_name,email,phone,id]
    );
    return result;
}

//delete
async function deleteUser(id){
    const [result]=await con.promise().query(
        `DELETE FROM users WHERE id=?`,
        [id]
    )
return result;
}

module.exports={
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByEmailSafe,
    createUser,
    updateUser,
    deleteUser
};