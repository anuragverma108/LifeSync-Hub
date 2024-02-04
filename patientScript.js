// patientScript.js

// Initialize Firebase (make sure to replace the config with your Firebase project config)
const firebaseConfig = {
    apiKey: "AIzaSyAUOrUATG6PdGzkJjc9Ve5FKydGb2d2GsM",
    authDomain: "lifesync-hub.firebaseapp.com",
    projectId: "lifesync-hub",
    storageBucket: "lifesync-hub.appspot.com",
    messagingSenderId: "958981708990",
    appId: "1:958981708990:web:7734d5a76968a2144cd2ef"
  };

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  function submitAppointment(event) {
      event.preventDefault();
  
      const patientName = document.getElementById('patientName').value;
      const appointmentDate = document.getElementById('appointmentDate').value;
  
      // Calculate expected wait time (example: 7 minutes)
      const expectedWaitTimeInSeconds = 420;
  
      // Save appointment data to the Firebase Realtime Database
      const appointmentRef = database.ref('appointments').push({
          patientName: patientName,
          appointmentDate: appointmentDate,
          expectedWaitTime: expectedWaitTimeInSeconds
      });
  
      // Reset the form
      document.getElementById('appointmentForm').reset();
  }
  