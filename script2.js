// Function to display grades based on search
function displayGrades(data, searchValue) {
  const gradesContainer = document.getElementById("grades-container");
  console.log(data);

  // Clear existing content
  gradesContainer.innerHTML = "";

  // Filter data based on the search value
  const filteredData = data.filter((entry) =>
    entry[0].toString().includes(searchValue)
  );
  console.log(filteredData);
  gradesContainer.innerHTML = filteredData;
  // Display only the first array with the matched value
  // If searchValue is empty, do not display anything
  //   if (!searchValue) {
  //     return;
  //   }
  //   if (filteredData.length > 0) {
  //     const matchedEntry = filteredData[0];
  //     const gradeElement = document.createElement("div");
  //     // gradeElement.textContent = `${matchedEntry[0]}: ${matchedEntry[1]}`;
  //     // gradesContainer.appendChild(gradeElement);
  //     gradeElement.textContent = matchedEntry;
  //     gradesContainer.appendChild(gradeElement);
  //   }
}

// Function to read Excel file and return data
function readExcelFile(filePath) {
  return new Promise((resolve, reject) => {
    // Use your preferred method to fetch the file, e.g., fetch API
    fetch(filePath)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming the first sheet is the one you want to read
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert worksheet to array of objects
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        resolve(jsonData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Sample data URL (replace this with the actual path or URL to your Excel file)
const sampleDataURL = "view.xlsx";

const inputID = document.querySelector("#frmIdInput input");
function validateInput(inputElement) {
  // Remove non-digit characters from the input
  inputElement.value = inputElement.value.replace(/[^\d-]/g, "");
}

inputID.addEventListener("keyup", () => {
  validateInput(inputID);
});
// Call the readExcelFile function with the sample data URL
readExcelFile(sampleDataURL)
  .then((data) => {
    // Call the displayGrades function with the retrieved data initially
    displayGrades(data, "");

    // Add an input event listener to the input field for live search
    inputID.addEventListener("input", () => {
      const inputValue = inputID.value.trim(); // Trim to remove leading/trailing spaces
      validateInput(inputID);
      displayGrades(data, inputValue);
    });
  })
  .catch((error) => {
    console.error("Error reading Excel file:", error);
  });
