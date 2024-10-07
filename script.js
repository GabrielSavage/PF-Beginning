document.addEventListener("DOMContentLoaded", function () {
    const colors = [
        'rgb(156, 70, 156)', 'rgb(73, 73, 198)', 'rgb(176, 119, 157)',
        'rgb(77, 194, 100)', 'rgb(255, 69, 58)', 'rgb(173, 216, 230)',
        'rgb(255, 223, 0)', 'rgb(255, 165, 0)', 'rgb(255, 105, 180)',
        'rgb(144, 238, 144)', 'rgb(100, 149, 237)', 'rgb(238, 130, 238)',
        'rgb(255, 182, 193)', 'rgb(60, 179, 113)', 'rgb(255, 140, 0)',
        'rgb(218, 112, 214)', 'rgb(72, 61, 139)', 'rgb(127, 255, 212)',
        'rgb(250, 128, 114)', 'rgb(70, 130, 180)', 'rgb(219, 112, 147)',
        'rgb(255, 248, 220)', 'rgb(245, 222, 179)', 'rgb(128, 0, 128)',
        'rgb(255, 215, 0)'
    ];

    const messages = [
        "You", "Can", "See", "Some", "Of", "My", "Work", "Below"
    ];

    const numPetals = 96;  // Number of petals for sunflowers

    // Function to create sunflower petals
    function createSunflower(containerId, petalClass) {
        const container = document.getElementById(containerId);

        for (let i = 0; i < numPetals; i++) {
            const petal = document.createElement('div');
            petal.classList.add(petalClass);

            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            petal.style.backgroundColor = randomColor;

            const rotationAngle = (360 / numPetals) * i;
            petal.style.setProperty('--rotation', `${rotationAngle}deg`);

            container.appendChild(petal);
        }
    }

    // Function to randomly change colors of the petals
    function changePetalColors(petalClass) {
        const petals = document.querySelectorAll(`.${petalClass}`);
        petals.forEach(petal => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            petal.style.backgroundColor = randomColor;
        });
    }

    // Create sunflower petals
    createSunflower('sunflower1', 'petal');

    // Change colors every 1.5 seconds for sunflower petals
    setInterval(() => {
        changePetalColors('petal');
    }, 1500);

    // Function to randomize the color of each letter in the h1 text
    function randomizeH1Colors(h1) {
        const text = h1.innerText;
        h1.innerHTML = ""; // Clear existing text

        // Add each letter as a span with a random color
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');

            // Preserve spaces
            if (text[i] === " ") {
                span.style.width = "0.5rem"; // Make space visible
                span.style.display = "inline-block"; // Treat space as a block to render properly
            } else {
                span.innerText = text[i];
                span.style.color = colors[Math.floor(Math.random() * colors.length)];
            }

            h1.appendChild(span);
        }
    }

    // Add the stationary cloud with h1 text
    function addStationaryCloud() {
        const h1 = document.querySelector('.stationary-cloud h1');
        randomizeH1Colors(h1); // Randomize colors for h1
    }

    // Function to generate moving clouds with text
    function generateClouds(messages) {
        const body = document.body;

        // Clear any existing clouds if there are more than 7
        const existingClouds = document.querySelectorAll('.cloud');
        if (existingClouds.length >= 7) {
            existingClouds.forEach(cloud => cloud.remove());
        }

        // Shuffle the messages array
        const shuffledMessages = messages.sort(() => Math.random() - 0.5);

        // Create up to 7 clouds at a time
        for (let i = 0; i < 7; i++) {
            const cloud = document.createElement('div');
            cloud.classList.add('cloud');

            // Randomize the size of the cloud
            const cloudWidth = Math.random() * 150 + 100;
            const cloudHeight = cloudWidth * 0.6;
            cloud.style.width = `${cloudWidth}px`;
            cloud.style.height = `${cloudHeight}px`;

            // Randomize the initial vertical position of the cloud (below the stationary cloud)
            const topPosition = Math.random() * (window.innerHeight * 0.25);
            cloud.style.top = `${topPosition}px`;

            // Slow down the cloud movement
            const animationDuration = Math.random() * 10 + 20; // Clouds will move slower (20-30s)
            cloud.style.animationDuration = `${animationDuration}s`;

            // Add text inside the cloud
            const textElement = document.createElement('span');
            textElement.innerText = shuffledMessages[i];
            textElement.style.color = colors[Math.floor(Math.random() * colors.length)];
            textElement.style.fontFamily = 'Arial, sans-serif';
            textElement.style.fontSize = '1.5rem';
            textElement.style.position = 'absolute';
            textElement.style.top = '50%';
            textElement.style.left = '50%';
            textElement.style.transform = 'translate(-50%, -50%)';

            cloud.appendChild(textElement); // Append text to the cloud
            body.appendChild(cloud); // Append cloud to the body
        }
    }

    // Start the loop with clouds and randomized h1
    addStationaryCloud();
    setInterval(() => generateClouds(messages), 10000); // Loop every 10 seconds
});
