import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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
  
  const user=auth.currentUser;
  function updateUserProfile(user){
    const userName= user.displayName;
    const userEmail= user.email;
    const userProfilePicture= user.photoURL;
    console.log(userEmail)

    document.getElementById("userName").textContent= "Dr. "+userName;
    //document.getElementById("userEmail").textContent= userEmail;
    document.getElementById("userProfilePicture").src= userProfilePicture;
  }
  
  onAuthStateChanged(auth,(user) =>{
    if(user)
    {
        updateUserProfile(user);
        const uid=user.uid;
        return uid;
    }
    else
    {
        alert("Create Account and Login");
        window.location.href="../log.html";
    }
  });