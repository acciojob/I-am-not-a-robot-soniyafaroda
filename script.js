const baseImages = [
    "https://picsum.photos/id/100/200",
    "https://picsum.photos/id/101/200",
    "https://picsum.photos/id/102/200",
    "https://picsum.photos/id/103/200",
    "https://picsum.photos/id/104/200"
];

// pick a random one to duplicate
let duplicateIndex = Math.floor(Math.random() * baseImages.length);

// final set with one duplicate
let finalSet = [...baseImages, baseImages[duplicateIndex]];

// shuffle the six images
finalSet.sort(() => Math.random() - 0.5);

// assign images to img1..img6
const tiles = document.querySelectorAll(".tile");
tiles.forEach((img, i) => {
    img.src = finalSet[i];
});

// ---- logic ----
let selected = [];
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");
const header = document.getElementById("h");

tiles.forEach(tile => {
    tile.addEventListener("click", () => {
        resetBtn.style.display = "inline-block";

        if (selected.length === 2) return;

        tile.classList.add("selected");
        selected.push(tile);

        if (selected.length === 2) {
            verifyBtn.style.display = "inline-block";
        }
    });
});

resetBtn.addEventListener("click", () => {
    selected = [];
    verifyBtn.style.display = "none";
    resetBtn.style.display = "none";
    para.textContent = "";

    tiles.forEach(tile => tile.classList.remove("selected"));

    header.textContent =
        "Please click on the identical tiles to verify that you are not a robot.";
});

verifyBtn.addEventListener("click", () => {
    verifyBtn.style.display = "none";

    if (selected[0].src === selected[1].src) {
        para.textContent = "You are a human. Congratulations!";
    } else {
        para.textContent =
            "We can't verify you as a human. You selected the non-identical tiles.";
    }
});
