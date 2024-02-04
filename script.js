const diseases = {
    Cold: ['fever', 'cough'],
    Flu: ['fever', 'cough'],
    Covid19: ['fever', 'cough', 'headache'],
    Allergies: ['sneezing', 'itchy_eyes', 'runny_nose'],
    Migraine: ['severe_headache', 'nausea', 'light_sensitivity']
  };
  
  document.getElementById('detect-btn').addEventListener('click', function () {
    const selectedSymptoms = Array.from(document.querySelectorAll('input[name="symptom"]:checked'))
      .map(checkbox => checkbox.value);
  
    const matchedDiseases = matchDisease(selectedSymptoms);
    displayDiseases(matchedDiseases);
  });
  
  function matchDisease(symptoms) {
    const matchedDiseases = [];
  
    for (const disease in diseases) {
      const diseaseSymptoms = diseases[disease];
      const allSymptomsMatched = diseaseSymptoms.every(symptom => symptoms.includes(symptom));
  
      if (allSymptomsMatched) {
        matchedDiseases.push(disease);
      }
    }
  
    return matchedDiseases;
  }
  
  function displayDiseases(diseases) {
    const diseaseList = document.getElementById('disease-list');
    diseaseList.innerHTML = '';
  
    if (diseases.length === 0) {
      const listItem = document.createElement('li');
      listItem.textContent = 'No matching diseases found.';
      const consultLink = document.createElement('a');
      consultLink.href = 'https://www.practo.com/kolkata/doctors';
      consultLink.textContent = 'Consult Doctors';
      listItem.appendChild(document.createElement('br'));
      listItem.appendChild(document.createElement('br'));
      listItem.appendChild(consultLink);
      diseaseList.appendChild(listItem);
    } else {
      diseases.forEach(disease => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = "";
        link.textContent = disease;
        listItem.appendChild(link);
        console.log("Hello");
  
        if (disease === 'Cold') {
  
          link.href = 'https://www.practo.com/kolkata/treatment-for-colds';
  
        } else if (disease === 'Flu') {
  
          link.href = 'https://www.practo.com/kolkata/treatment-for-flu';
  
        } else if (disease === 'Covid19') {
  
          link.href = 'https://www.practo.com/kolkata/doctors-for-coronavirus-symptoms-treatment';
  
  
        } else if (disease === 'Allergies') {
  
          link.href = 'https://www.lybrate.com/kolkata/treatment-for-allergy';
  
        } else if (disease === 'Migraine') {
  
          link.href = 'https://www.practo.com/kolkata/doctors-for-migraine-treatment';
  
        }
  
        diseaseList.appendChild(listItem);
      });
    }
  
    document.getElementById('result-container').style.display = 'block';
  
  
  }