// Replace with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4Qc2jo5iAOEkQE7_8ZCjNMohUSsW-wkg",
    authDomain: "lifesync-hub-c2e7a.firebaseapp.com",
    databaseURL: "https://lifesync-hub-c2e7a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lifesync-hub-c2e7a",
    storageBucket: "lifesync-hub-c2e7a.appspot.com",
    messagingSenderId: "795814633649",
    appId: "1:795814633649:web:de354408dee99872c8c290",
    measurementId: "G-2FHJ730MV3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const appointmentForm = document.getElementById("appointmentForm");

appointmentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const patientName = document.getElementById("patientName").value;
    const appointmentDate = document.getElementById("appointmentDate").value;

    if (patientName.trim() !== "" && appointmentDate.trim() !== "") {
        const appointmentsRef = firebase.database().ref("appointments");
        appointmentsRef.push({
            patientName: patientName,
            appointmentDate: appointmentDate
        });

        // Clear form fields
        document.getElementById("patientName").value = "";
        document.getElementById("appointmentDate").value = "";
    }
});
