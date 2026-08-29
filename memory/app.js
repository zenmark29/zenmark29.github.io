
// Load existing titles into the dropdowns
window.onload = () => {
    loadTitles();
    loadDeleteTitles();
    loadTestTitles();  // Load test titles
};

// Save


// Save or update fact in localStorage
document.getElementById('memory-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const prompt = document.getElementById('prompt').value.trim();
    const remember = document.getElementById('remember').value.trim();

    if (!title || !prompt || !remember) {
        alert("All fields are required!");
        return;
    }

    // Get existing data from localStorage
    const storedData = JSON.parse(localStorage.getItem('memoryData')) || {};

    // Add or update data
    if (!storedData[title]) {
        storedData[title] = {};
    }

    const factId = `fact${Object.keys(storedData[title]).length + 1}`;
    storedData[title][factId] = [prompt, remember];

    // Save back to localStorage
    localStorage.setItem('memoryData', JSON.stringify(storedData));

    // Clear form and reload titles
    document.getElementById('memory-form').reset();
    loadTitles();
    loadTestTitles();
    loadDeleteTitles();

    alert('Fact saved!');
});

// Load existing titles for review or delete
function loadTitles() {
    const titlesDropdown = document.getElementById('titles');
    titlesDropdown.innerHTML = ''; // Clear dropdown

    const storedData = JSON.parse(localStorage.getItem('memoryData')) || {};
    for (const title in storedData) {
        const option = document.createElement('option');
        option.value = title;
        option.textContent = title;
        titlesDropdown.appendChild(option);
    }
}

function loadDeleteTitles() {
    const deleteDropdown = document.getElementById('delete-titles');
    deleteDropdown.innerHTML = ''; // Clear dropdown

    const storedData = JSON.parse(localStorage.getItem('memoryData')) || {};
    for (const title in storedData) {
        const option = document.createElement('option');
        option.value = title;
        option.textContent = title;
        deleteDropdown.appendChild(option);
    }
}

// Review facts for a selected title
function reviewFacts() {
    const selectedTitle = document.getElementById('titles').value;
    const storedData = JSON.parse(localStorage.getItem('memoryData')) || {};

    document.getElementById('review-section').style.display = 'block'; // Show review section
    document.getElementById('test-section').style.display = 'none'; // Hide test section
    // no cheating!!! you can review the facts but you can't test yourself on them at the same time

    const reviewSection = document.getElementById('review-section');
    reviewSection.innerHTML = ''; // Clear previous content

    if (storedData[selectedTitle]) {
        for (const fact in storedData[selectedTitle]) {
            const prompt = storedData[selectedTitle][fact][0];
            const remember = storedData[selectedTitle][fact][1];
            const factDiv = document.createElement('div');
            factDiv.innerHTML = `<strong>Prompt:</strong> ${prompt} <br> <strong>Remember:</strong> ${remember}<br>`;
            reviewSection.appendChild(factDiv);
        }
    }
}

// Delete selected title and associated facts
function deleteData() {
    const selectedTitle = document.getElementById('delete-titles').value;
    const storedData = JSON.parse(localStorage.getItem('memoryData')) || {};

    if (storedData[selectedTitle]) {
        // Show confirmation dialog
        const confirmed = confirm(`Are you sure you want to delete "${selectedTitle}"?`);

        if (confirmed) {
            delete storedData[selectedTitle];
            localStorage.setItem('memoryData', JSON.stringify(storedData));
            loadTitles();
            loadTestTitles();
            loadDeleteTitles();
            alert('Title and facts deleted!');
        }
    }
}
    // Load titles into the dropdown for the test section
    function loadTestTitles() {
        const testDropdown = document.getElementById('test-titles');
        testDropdown.innerHTML = ''; // Clear dropdown

        const storedData = JSON.parse(localStorage.getItem('memoryData')) || {};
        for (const title in storedData) {
            const option = document.createElement('option');
            option.value = title;
            option.textContent = title;
            testDropdown.appendChild(option);
        }
    }

    // Start the memory test by loading the prompts
    function startTest() {
        const selectedTitle = document.getElementById('test-titles').value;
        const storedData = JSON.parse(localStorage.getItem('memoryData')) || {};

        const testSection = document.getElementById('test-section');
        testSection.innerHTML = ''; // Clear previous test

        // Hide review data
        document.getElementById('review-section').style.display = 'none';
        document.getElementById('test-section').style.display = 'block'; // Show test section

        if (storedData[selectedTitle]) {
            const form = document.createElement('form');
            form.id = 'test-form';

            for (const fact in storedData[selectedTitle]) {
                const prompt = storedData[selectedTitle][fact][0];

                const promptDiv = document.createElement('div');
                promptDiv.innerHTML = `<label><strong>Prompt:</strong> ${prompt}</label><br>`;

                const inputField = document.createElement('input');
                inputField.type = 'text';
                inputField.name = fact;
                inputField.required = true;

                promptDiv.appendChild(inputField);
                form.appendChild(promptDiv);
            }

            const checkButton = document.createElement('button');
            checkButton.type = 'button';
            checkButton.textContent = 'Check Me';
            checkButton.onclick = checkAnswers;

            form.appendChild(checkButton);
            testSection.appendChild(form);
        }
    }

    // Check the answers submitted by the user
    function checkAnswers() {
        const selectedTitle = document.getElementById('test-titles').value;
        const storedData = JSON.parse(localStorage.getItem('memoryData')) || {};

        const form = document.getElementById('test-form');
        const inputs = form.querySelectorAll('input');

        for (const input of inputs) {
            const factId = input.name;
            const userAnswer = input.value.trim().toLowerCase();
            const correctAnswer = storedData[selectedTitle][factId][1].toLowerCase();

            // Compare answers
            if (userAnswer === correctAnswer) {
                input.style.color = 'green';  // Correct answer
            } else {
                input.style.color = 'red';  // Incorrect answer
            }
        }
    }



