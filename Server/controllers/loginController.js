

const con = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const qrcode = require('qrcode');
const speakeasy= require('speakeasy')

// const env = require('../.env');
// env.config();


let user={}
const handleLogin= async(req, res) => {
    const sql = "SELECT * FROM user Where email = ?";
    // AND  password = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json({  Error: "Login error in server !!"});
        if(result.length > 0) {
          user =result[0];
            const id = result[0].id; 
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response)=>{
             if(err){ return res.json({Error: "Password compare error "})}
             if(response){
                const otpauthURL = speakeasy.otpauthURL({
                secret:result[0].secretKey  ,
                encoding: 'base64',
                label: `${result[0].username} (botsCompete)`,
                });
                  qrcode.toDataURL(otpauthURL, (err, dataUrl) => {
                    if (err) {
                      return res.status(500).json({ error: 'Internal server error' });
                    }
                 
                    return res.json({Status:"success", QR: dataUrl, key: result[0].secretKey, id: result[0].userID,role: result[0].role })})
                }else {

                 return res.json({ Error: "Wrong password. "})
               }
            } )}

            // if(req.body.password.toString()!== result[0].password){  return res.json({ Error: "Wrong  Password"});}
                 else  {
           
            return res.json({Error: "Please enter a valid email !"})}
        
    })
} 
 const handle2FAVerification =(req, res)=>{
  const role =req.body.role
  const id = req.body.id 
var verified=speakeasy.totp.verify(

    {
        secret: req.body.secretKey,
         encoding:'base64',
         token: req.body.token ,

    }) 
            if(verified){
                 
                    const token = jwt.sign({role: role , id: id}, "jwt-secret-key" , {expiresIn : '1d'})
                    res.cookie('token', token);
                    req.session.user = user; 
                res.json({Status:"Success" })
                
                    }  else{ 
                     res.json({Error: "Invalide code."})
                    }
            }

 const handlesession =(req, res)=>{

  if(req.session.user){
    res.send({loggedIn:true, user:req.session.user})
   } else{
      res.send({loggedIn: false})
    }

 }
module.exports={handleLogin,handlesession, handle2FAVerification};