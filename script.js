//your code here
window.onload = function () {
    const imagesDiv = document.getElementById("images");
    const resetBtn = document.getElementById("reset");
    const verifyBtn = document.getElementById("verify");
    const resultText = document.getElementById("result");

    // ---- STEP 1: Prepare Image Set ----
    let uniqueImages = [
        "img1.jpg",
        "img2.jpg",
        "img3.jpg",
        "img4.jpg",
        "img5.jpg"
    ];

    // Pick a random image to duplicate
    let duplicateImage = uniqueImages[Math.floor(Math.random() * uniqueImages.length)];

    // Create final 6-image array
    let finalImages = [...uniqueImages, duplicateImage];

    // Shuffle images
    finalImages.sort(() => Math.random() - 0.5);

    // ---- State Variables ----
    let selected = [];

    // ---- STEP 2: Display Images ----
    finalImages.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.dataset.index = index;

        img.onclick = function () {
            handleImageClick(img);
        };

        imagesDiv.appendChild(img);
    });

    // ---- STEP 3: Handle Image Click ----
    function handleImageClick(img) {
        if (selected.length === 2) return; // prevent selecting more than 2

        img.classList.add("selected");
        selected.push(img);

        // STATE 2 → show Reset button
        resetBtn.style.display = "block";

        if (selected.length === 2) {
            // STATE 3 → two selected → show verify button
            verifyBtn.style.display = "block";
        }
    }

    // ---- RESET button ----
    resetBtn.onclick = function () {
        selected = [];
        verifyBtn.style.display = "none";
        resetBtn.style.display = "none";
        resultText.textContent = "";
        document.querySelectorAll("#images img").forEach(img => img.classList.remove("selected"));
    };

    // ---- VERIFY button ----
    verifyBtn.onclick = function () {
        verifyBtn.style.display = "none"; // STATE 4
        const [img1, img2] = selected;

        if (img1.src === img2.src) {
            resultText.textContent = "You are a human. Congratulations!";
        } else {
            resultText.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        }
    };
};

