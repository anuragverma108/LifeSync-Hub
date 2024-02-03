import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUOrUATG6PdGzkJjc9Ve5FKydGb2d2GsM",
  authDomain: "lifesync-hub.firebaseapp.com",
  projectId: "lifesync-hub",
  storageBucket: "lifesync-hub.appspot.com",
  messagingSenderId: "958981708990",
  appId: "1:958981708990:web:7734d5a76968a2144cd2ef"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
auth.languageCode = 'en'
const provider= new GoogleAuthProvider();


const googleLogin1= document.getElementById("btnn");
googleLogin1.addEventListener("click",function(){
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log(user);
    window.location.href="./doctor.html";
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
})

const googleLogin2= document.getElementById("patient");
googleLogin2.addEventListener("click",function(){
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log(user);
    window.location.href="./patient.html";
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
})


function updateUserProfile(user){
const userName= user.displayName;
const userEmail= user.email;
const userProfilePicture= user.photoURL;
}

document.getElementById("userName").textContent= userName;
document.getElementById("userEmail").textContent= userEmail;
document.getElementById("userProfilePicture").src= userProfilePicture;

updateUserProfile()