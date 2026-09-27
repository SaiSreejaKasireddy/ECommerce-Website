function ValidateUser(userData){
    const {
        first_name,
        last_name,
        email,
        password,
        phone
    }=userData;

    if(!first_name || !last_name || !email || !password || !phone){
        return "All requirements were not entered.."
    }
    if(!email.includes('@')){
        return "Enter proper email format"
    }
    if(password.length<8){
        return "Enter password whose length is greater than 8"
    }
      if (phone && !/^\d{10}$/.test(phone)){
        return "Enter formatted mobile number"
    }
    return null;
}
module.exports={
    ValidateUser
}