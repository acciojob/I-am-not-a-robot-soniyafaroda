// Unique images (use your own image paths)
const uniqueImages = [
  "https://via.placeholder.com/180?text=A",
  "https://via.placeholder.com/180?text=B",
  "https://via.placeholder.com/180?text=C",
  "https://via.placeholder.com/180?text=D",
  "https://via.placeholder.com/180?text=E"
];

// STEP 1 → Select one random image to duplicate
const duplicateIndex = Math.floor(Math.random() * uniqueImages.length);
const duplicateImage = uniqueImages[duplicateIndex];

// Create full image set (5 unique + 1 duplicate)
let images = [...uniqueImages, duplicateImage];

// STEP 2 → Shuffle images randomly
images = images.sort(() => Math.random() - 0.5);

// DOM elements
const container = document.getElementById("container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");

let selectedImages = [];
let selectedTiles = [];

// STEP 3 → Load tiles into DOM
images.forEach((src, index) => {
  const img = document.createElement("img");
  img.src = src;
  img.className = "tile";
  img.dataset.index = index;

  img.addEventListener("click", () => handleTileClick(img));

  container.appendChild(img);
});

// FUNCTION → When user clicks an image
function handleTileClick(img) {
  // Do not allow more than 2 tiles
  if (selectedImages.length === 2) return;

  // Prevent selecting same tile twice
  if (selectedTiles.includes(img)) return;

  img.classList.add("selected");

  selectedImages.push(img.src);
  selectedTiles.push(img);

  // Show Reset button when first tile clicked
  resetBtn.style.display = "inline-block";

  // After 2 images selected → Show Verify button
  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// FUNCTION → RESET STATE
resetBtn.addEventListener("click", () => {
  selectedImages = [];
  selectedTiles.forEach(tile => tile.classList.remove("selected"));
  selectedTiles = [];

  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  para.textContent = "";
});

// FUNCTION → VERIFY SELECTION
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none"; // hide after verification

  if (selectedImages.length === 2 && selectedImages[0] === selectedImages[1]) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});
