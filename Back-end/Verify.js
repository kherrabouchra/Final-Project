const speakeasy = require('speakeasy')
var verified=speakeasy.totp.verify(

    {
        secret:'p}o*Apt.zT)!2Q$yLkbRbsfTLL!ROXge', encoding:"ascii", token:"175621"
    }
)
console.log(verified);
if(verified){

}else{
    
}