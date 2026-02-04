let userToken = localStorage.getItem("token");

/* ---------- AUTH UI ---------- */
function renderAuthLinks() {
  const authDiv = document.getElementById("authLinks");
  if (!authDiv) return;

  if (userToken) {
    authDiv.innerHTML = `<a href="#" class="auth-pill primary" onclick="logout()">Logout</a>`;
  } else {
    authDiv.innerHTML = `
      <a href="login.html" class="auth-pill">Login</a>
      <a href="register.html" class="auth-pill primary">Register</a>
    `;
  }
}
renderAuthLinks();

/* ---------- HERO BUBBLES (HOME ONLY) ---------- */
const bubbleInfo = document.getElementById("bubbleInfo");
const bubbleTitle = document.getElementById("bubbleTitle");
const bubbleBody = document.getElementById("bubbleBody");
const bubbles = document.querySelectorAll(".orb[data-title]");

if (bubbleInfo && bubbleTitle && bubbleBody && bubbles.length) {
  bubbles.forEach((bubble) => {
    bubble.addEventListener("click", () => {
      const title = bubble.getAttribute("data-title") || "Why labels matter";
      const body = bubble.getAttribute("data-body") || "";
      bubbleTitle.textContent = title;
      bubbleBody.textContent = body;
      bubbleInfo.classList.remove("is-active");
      void bubbleInfo.offsetWidth;
      bubbleInfo.classList.add("is-active");
    });
  });
}

/* ---------- HOME / SCAN ACTIONS ---------- */
function uploadImage() {
  const input = document.getElementById("imageInput");
  if (!input) return;
  const ok = window.confirm("Allow NutriScan to access your gallery to upload a label?");
  if (ok) input.click();
}

function openCamera() {
  const modal = document.getElementById("scannerModal");
  const video = document.getElementById("scannerVideo");
  if (!modal || !video) return;

  const ok = window.confirm("Allow NutriScan to use your camera for scanning labels?");
  if (!ok) return;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" }, audio: false })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch(() => {
        alert("Camera access was denied or unavailable.");
        closeScanner();
      });
  } else {
    alert("Camera access is not supported in this browser.");
    closeScanner();
  }
}

/* ✅ UPDATED: VIEW HISTORY LOGIC */
function checkHistory() {
  if (userToken) {
    window.location.href = "history.html";
  } else {
    window.location.href = "register.html";
  }
}

/* ---------- IMAGE HANDLING (SCAN PAGE ONLY) ---------- */
const imageInput = document.getElementById("imageInput");
const cameraInput = document.getElementById("cameraInput");

if (imageInput) imageInput.addEventListener("change", handleScan);
if (cameraInput) cameraInput.addEventListener("change", handleScan);

function handleScan() {
  alert("Scan received! (OCR + ML processing will happen here)");
}

function closeScanner() {
  const modal = document.getElementById("scannerModal");
  const video = document.getElementById("scannerVideo");
  if (video && video.srcObject) {
    const tracks = video.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    video.srcObject = null;
  }
  if (modal) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }
}

function captureScan() {
  const video = document.getElementById("scannerVideo");
  const canvas = document.getElementById("scannerCanvas");
  const frame = document.querySelector(".scanner-frame");
  if (!video || !canvas || !frame) return;

  const width = video.videoWidth || 1280;
  const height = video.videoHeight || 720;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(video, 0, 0, width, height);

  frame.classList.remove("scan-captured");
  void frame.offsetWidth;
  frame.classList.add("scan-captured");
  setTimeout(() => {
    alert("Label captured! (OCR + ML processing will happen here)");
  }, 200);
}

/* ---------- LOGIN ---------- */
function login() {
  const email = document.getElementById("loginEmail");
  const password = document.getElementById("loginPassword");

  if (!email || !password || !email.value || !password.value) {
    alert("Please fill all fields.");
    return;
  }

  localStorage.setItem("token", "dummy_token");
  userToken = "dummy_token";
  window.location.href = "index.html";
}

/* ---------- REGISTER ---------- */
function register() {
  const first = document.getElementById("firstName");
  const last = document.getElementById("lastName");
  const email = document.getElementById("registerEmail");
  const pass = document.getElementById("registerPassword");
  const confirm = document.getElementById("confirmPassword");

  if (
    !first || !last || !email || !pass || !confirm ||
    !first.value || !last.value || !email.value || !pass.value || !confirm.value
  ) {
    alert("Please fill all fields.");
    return;
  }

  if (pass.value !== confirm.value) {
    alert("Passwords do not match.");
    return;
  }

  alert("Registration successful! Please login.");
  window.location.href = "login.html";
}

/* ---------- LOGOUT ---------- */
function logout() {
  localStorage.removeItem("token");
  userToken = null;
  window.location.href = "index.html";
}

/* ---------- FACT LOOP (HERO PAGE ONLY) ---------- */
const facts = [
  "🥦 Broccoli has more Vitamin C than an orange",
  "🧂 Too much salt can sneak up on you",
  "🍭 Less sugar today = more energy tomorrow",
  "🥗 Fiber keeps you fuller for longer",
  "📦 Labels don’t lie — read them"
];

let factIndex = 0;
const factEl = document.getElementById("fact");

if (factEl) {
  factEl.innerText = "• " + facts[0];
  factEl.style.transform = "translateY(0)";

  setInterval(() => {
    factEl.style.transform = "translateY(-120%)";

    setTimeout(() => {
      factIndex = (factIndex + 1) % facts.length;
      factEl.innerText = "• " + facts[factIndex];
      factEl.style.transform = "translateY(120%)";

      setTimeout(() => {
        factEl.style.transform = "translateY(0)";
      }, 60);
    }, 350);
  }, 4500);
}
