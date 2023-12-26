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

// Function to display grades
function displayGrades(data) {
  const gradesContainer = document.getElementById("grades-container");

  // Clear existing content
  gradesContainer.innerHTML = "";
  console.log(data);

  //   console.log(data[1]);
  //   const ds = data[1];
  //   const id = data[0];
  //   console.log(ds[1]); //    get specific data inside the array
  //   gradesContainer.textContent = `${ds[0]} ${id[0]}`;

  // Iterate through the data and create HTML elements
  //   data.forEach((entry) => {
  //     const gradeElement = document.createElement("div");
  //     gradeElement.textContent = `${entry[0]}: ${entry[1]}`;

  //     gradesContainer.appendChild(gradeElement);
  //   });
}

// Call the readExcelFile function with the sample data URL
readExcelFile(sampleDataURL)
  .then((data) => {
    // Call the displayGrades function with the retrieved data
    displayGrades(data);
  })
  .catch((error) => {
    console.error("Error reading Excel file:", error);
  });

const inputID = document.querySelector("#frmIdInput input");
function validateInput(inputElement) {
  // Remove non-digit characters from the input
  inputElement.value = inputElement.value.replace(/[^\d-]/g, "");
}

inputID.addEventListener("keyup", () => {
  validateInput(inputID);
});
