// const QRCode = require('qrcode');
// const secret = 'some-unique-secret-key-generated-for-the-user';

// QRCode.toDataURL(`otpauth://totp/MyApp:${email}?secret=${secret}&issuer=MyApp`, (err, dataURL) => {
//   if (err) {
//     console.log('Error generating QR code:', err);
//     // Handle error
//   } else {
//     // Return the QR code image data URL to the client
//     res.json({ dataURL });
//   }
// });
 
// import React, { useState } from 'react';
// import QRCode from 'qrcode.react';
// function QRCodeComponent() {
//   const [dataURL, setDataURL] = useState(null);

//   // Make a request to the backend to get the QR code image data URL
//   useEffect(() => {
//     axios.get('/api/generate-qr-code')
//       .then(res => setDataURL(res.data.dataURL))
//       .catch(err => console.log('Error getting QR code:', err));
//   }, []);

//   return (
//     <div>
//       {dataURL ? <QRCode value={dataURL} /> : 'Loading QR code...'}
//     </div>
//   );
// } 


const speakeasy = require('speakeasy')
const qrcode = require('qrcode')

 var key = speakeasy.generateSecret({

    name: "helloworld"
 }) 

 console.log(key);
qrcode.toDataURL(key.otpauth_url, function (err, data) {
    console.log(data);
})