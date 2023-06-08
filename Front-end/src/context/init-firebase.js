 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 
 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyBI5wXXPqjybPCaxed-WYs1-KRQ-j9POps",
   authDomain: "otpauth-d22d0.firebaseapp.com",
   projectId: "otpauth-d22d0",
   storageBucket: "otpauth-d22d0.appspot.com",
   messagingSenderId: "636294014083",
   appId: "1:636294014083:web:b9b53c61a33f81a3a8a7b6",
   measurementId: "G-HJX1TXM64Y"
 };
 
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth  = getAuth(app)
 const analytics = getAnalytics(app);