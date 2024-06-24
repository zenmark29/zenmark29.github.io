var countOfItems = 0;
var globalArray = '';
// Function to create text fields based on user input
function createTextFields() {
    var reloadOfData = false;
    var count = parseInt(document.getElementById('itemCount').value);
    if (count === 0 || isNaN(count)){
        count = countOfItems;
        reloadOfData = true;
    }
    const container = document.getElementById('data-container');
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter text';
        input.value = reloadOfData ? globalArray[i] : ''
        container.appendChild(input);
    }

    // Show save button
    const saveButton = document.getElementById('saveButton');
    saveButton.style.display = 'block';
    container.style.display = 'block';
}

// Function to save data to local storage
window.onload = function loadSaveData() {

    if (localStorage.getItem('memoryData') == null){
        return;
    }
    // Hide text fields and show saved data
    const container = document.getElementById('data-container');
    container.innerHTML = '';

    const savedData = JSON.parse(localStorage.getItem('memoryData'));
    globalArray = savedData;
    countOfItems = savedData.length;
    savedData.forEach(item => {
        const p = document.createElement('p');
        p.textContent = item;
        container.appendChild(p);
    });

    // Show test button
    const testButton = document.getElementById('testButton');
    testButton.style.display = 'block';

    // Show input fields for the next round
    createTextFields();
}

// Function to save data to local storage
function saveData() {
    const data = [];
    const inputs = document.querySelectorAll('#data-container input');

    inputs.forEach((input) => {
        data.push(input.value);
    });

    localStorage.setItem('memoryData', JSON.stringify(data));

    // Hide text fields and show saved data
    const container = document.getElementById('data-container');
    container.innerHTML = '';

    const savedData = JSON.parse(localStorage.getItem('memoryData'));
    // savedData.forEach((item) => {
    //     const p = document.createElement('p');
    //     p.textContent = item;
    //     container.appendChild(p);
    // });

    // Show test button
    const testButton = document.getElementById('testButton');
    testButton.style.display = 'block';

    // Show input fields for the next round
    createTextFields();
}

// Function to test memory
function testMemory() {
    const savedData = JSON.parse(localStorage.getItem('memoryData'));
    console.log(typeof savedData);
    const testInputs = document.querySelectorAll('#data-container input');
    const errors = [];

    savedData.forEach((item, index) => {
        if (item.trim() !== testInputs[index].value.trim()) {
            errors.push({ expected: item, found: testInputs[index].value });
        }
    });

    // Display errors
    var errorContainer = '';
    errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';

    errors.forEach((error) => {
        const p = document.createElement('p');
        p.textContent = `Expected: ${error.expected}, Found: ${error.found}`;
        errorContainer.appendChild(p);
    });

    // Show try again, reset, and exit buttons
    // const tryAgainButton = document.getElementById('tryAgainButton');
    // tryAgainButton.style.display = 'block';

    const resetButton = document.getElementById('resetButton');
    resetButton.style.display = 'block';

    // const exitButton = document.getElementById('exitButton');
    // exitButton.style.display = 'block';

    document.body.appendChild(errorContainer);
}

// Function to reset data
function resetData() {
    localStorage.removeItem('memoryData');
    location.reload(); // Reload the page to clear data
}

function displayData(){
    createTextFields();
}

// Attach event listeners to buttons
document.getElementById('createButton').addEventListener('click', createTextFields);
document.getElementById('saveButton').addEventListener('click', saveData);
document.getElementById('testButton').addEventListener('click', testMemory);
document.getElementById('resetButton').addEventListener('click', resetData);
document.getElementById('reviewButton').addEventListener('click', displayData);
