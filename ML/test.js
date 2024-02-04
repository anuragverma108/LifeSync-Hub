// Replace 'your_csv_file.csv' with the actual path to your CSV file
const csvFilePath = 'Training-2.csv';

// Fetch the CSV file
fetch(csvFilePath)
    .then(response => response.text())
    .then(csvData => {
        // Parse CSV data into an array of rows
        const rows = csvData.split('\n');

        // Initialize an array to store arrays for each row
        const csvArray = [];

        // Iterate through rows and create an array for each row
        for (let i = 1; i < rows.length-1; i++) {
            const columns = rows[i].split(',');

            // Add the array for the current row to the main array
            csvArray.push(columns);
        }

        // Now, csvArray contains arrays for each row of the CSV file
        console.log(csvArray);
    })
    .catch(error => console.error('Error fetching the CSV file:', error));
