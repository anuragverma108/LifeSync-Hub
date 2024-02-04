// patientView.js

// Initialize Firebase (replace with your Firebase project config)
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

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const patientListContainer = document.getElementById('patientList');
const countdownElement = document.getElementById('countdown');

// Fetch and display upcoming appointments
function fetchAppointments() {
    const appointmentsRef = database.ref('appointments');

    appointmentsRef.on('value', (snapshot) => {
        const appointments = snapshot.val();
        patientListContainer.innerHTML = '';

        if (appointments) {
            const sortedAppointments = Object.values(appointments).sort(
                (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)
            );


            sortedAppointments.forEach((appointment) => {
                const appointmentDetails = `
            <div>
                <h3>${appointment.patientName}</h3>
                <p>Appointment Date: ${appointment.appointmentDate}</p>
            </div>
        `;
                patientListContainer.innerHTML += appointmentDetails;
            });

            // Update the timer with the time difference between the current time and the next appointment
            const currentTime = new Date();
            const nextAppointmentTime = new Date(sortedAppointments[0].appointmentDate);
            const timeDifferenceInSeconds = Math.floor((nextAppointmentTime - currentTime) / 1000);

            // Call startCountdown with the formatted time
            startCountdown(timeDifferenceInSeconds);
        } else {
            patientListContainer.innerHTML = '<p>No upcoming appointments.</p>';
            countdownElement.textContent = 'N/A';
        }
    });
}

// You can customize and expand the functionality as needed.
fetchAppointments();