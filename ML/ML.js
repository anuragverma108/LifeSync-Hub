const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');

const diseaseData = [
    { symptoms: ['fever', 'headache'], disease: 'Flu' },
    { symptoms: ['cough', 'shortness of breath'], disease: 'COVID-19' },
    { symptoms: ['itching', 'skin rash'], disease: 'Fungal Infection' },
    { symptoms: ['itching'], disease: 'Fungal Infection' },
    { symptoms: ['skin rash'], disease: 'Fungal Infection' },
    { symptoms: ['continuous sneezing', 'shivering'], disease: 'Allergy' },
    { symptoms: ['shivering'], disease: 'Allergy' },
    { symptoms: ['continuous sneezing'], disease: 'Allergy' },
    { symptoms: ['stomach pain', 'acidity'], disease: 'GERD' },
    { symptoms: ['stomach ache', 'acidity'], disease: 'GERD' },
    { symptoms: ['stomach pain'], disease: 'GERD' },
    { symptoms: ['stomach ache'], disease: 'GERD' },
    { symptoms: ['acidity'], disease: 'GERD' },
    { symptoms: ['itching', 'vomitting'], disease: 'Chronic cholestasis' },
    { symptoms: ['itching'], disease: 'Chronic cholestasis' },
    { symptoms: ['itching', 'skin rash','stomach ache'], disease: 'Drug Reaction' },
    { symptoms: ['itching', 'skin rash','stomach ache'], disease: 'Drug Reaction' },
    { symptoms: ['vomitting'], disease: 'Peptic Ulcer Disease' },
    { symptoms: ['vomitting','indigestion'], disease: 'Peptic Ulcer Disease' },
    { symptoms: ['indigestion'], disease: 'Peptic Ulcer Disease' },
    { symptoms: ['high fever','muscle pain'], disease: 'AIDS' },
    { symptoms: ['weight loss','restlessness','lethargy'], disease: 'Diabetes' },
    { symptoms: ['weight loss','lethargy'], disease: 'Diabetes' },
    { symptoms: ['weight loss','restlessness'], disease: 'Diabetes' },
    { symptoms: ['restlessness','lethargy'], disease: 'Diabetes' },
    
    
    // Add more symptom-disease mappings as needed
];

function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    // Display user message in the chatbox
    appendMessage('User', userMessage);

    // Process user symptoms and detect disease
    const detectedDisease = detectDisease(userMessage);

    // Display detected disease in the chatbox
    appendMessage('Chatbot', `Based on your symptoms, it could be ${detectedDisease}.`);

    // Clear user input
    userInput.value = '';
}

function detectDisease(userSymptoms) {
    // Convert user input to lowercase and split into an array of symptoms
    const symptomsArray = userSymptoms.toLowerCase().split(',');

    // Iterate through disease data to find a matching disease
    for (const data of diseaseData) {
        const intersection = data.symptoms.filter(symptom => symptomsArray.includes(symptom));
        if (intersection.length === data.symptoms.length) {
            return data.disease;
        }
    }

    // Return a default message if no matching disease is found
    return 'No specific disease detected. Consult a healthcare professional for accurate diagnosis.';
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = `${sender}: ${message}`;
    chatbox.appendChild(messageElement);

    // Scroll to the bottom of the chatbox
    chatbox.scrollTop = chatbox.scrollHeight;
}
