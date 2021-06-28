const crypt = require('bcrypt');
const {MD5} = require('crypto-js')
const jwt = require('jsonwebtoken')
// crypt.genSalt(10 ,(err,salt)=>{
//     if(err){
//         return next(err)
//     }  
//     else{
//         crypt.hash('password123' , salt , (err,hash)=>{
//             if(err) return next(err);
//             console.log(hash)
//         })
//     }
// })
// const secret ="secretpassword" 
// const user ={
//     id :1 ,
//     token : MD5('sdfsdfsdfsdf').toString()+secret

// }
// console.log(user)
const id = '1000'
const secret = "supersecret"
const token = jwt.sign(id , secret)
const receive = "eyJhbGciOiJIUzI1NiJ9.MTAwMA.L9PmqLlZjettygguzj25agunJu6NkvVtG9RFRBnK2Y"
const decodetoken = jwt.verify(receive,secret)
console.log(decodetoken)