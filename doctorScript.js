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

const patientListElement = document.getElementById("patientList");
const patientCountElement = document.getElementById("patientCount");

// Function to remove a patient by their key
function removePatientByKey(key) {
    const appointmentsRef = firebase.database().ref("appointments");
    appointmentsRef.child(key).remove();
}

// Retrieve appointments in real-time
const appointmentsRef = firebase.database().ref("appointments");
appointmentsRef.on("value", function (snapshot) {
    const appointments = snapshot.val();
    const patientCount = snapshot.numChildren();

    patientListElement.innerHTML = "";
    patientCountElement.textContent = patientCount;

    for (const key in appointments) {
        if (Object.hasOwnProperty.call(appointments, key)) {
            const appointment = appointments[key];
            const listItem = document.createElement("li");

            // Create a Remove button
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => removePatientByKey(key));

            listItem.innerHTML = `
                <span>${appointment.patientName} - ${appointment.appointmentDate}</span>
            `;
            
            // Append Remove button to the listItem
            listItem.querySelector("span").appendChild(removeButton);

            patientListElement.appendChild(listItem);
        }
    }
});
