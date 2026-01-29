let userToken = localStorage.getItem("token");

/* ---------- AUTH UI ---------- */
function renderAuthLinks() {
  const authDiv = document.getElementById("authLinks");
  if (!authDiv) return;

  if (userToken) {
    authDiv.innerHTML = `<a href="#" onclick="logout()">Logout</a>`;
  } else {
    authDiv.innerHTML = `
      <a href="login.html">Login</a>
      <a href="register.html">Register</a>
    `;
  }
}
renderAuthLinks();

/* ---------- HOME / SCAN ACTIONS ---------- */
function uploadImage() {
  const input = document.getElementById("imageInput");
  if (input) input.click();
}

function openCamera() {
  const input = document.getElementById("cameraInput");
  if (input) input.click();
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
