let userToken = localStorage.getItem("token");

/* ---------- AUTH UI ---------- */
function renderAuthLinks() {
  const authDiv = document.getElementById("authLinks");

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

/* ---------- HOME ACTIONS ---------- */
function uploadImage() {
  document.getElementById("imageInput").click();
}

function openCamera() {
  document.getElementById("cameraInput").click();
}

function checkHistory() {
  if (userToken) {
    window.location.href = "history.html";
  } else {
    document.getElementById("message").innerText =
      "Please register / login to save your scan history.";
  }
}

/* ---------- IMAGE HANDLING ---------- */
document.getElementById("imageInput").addEventListener("change", handleScan);
document.getElementById("cameraInput").addEventListener("change", handleScan);

function handleScan() {
  // Simulate scan result
  document.getElementById("homeActions").classList.add("hidden");
  document.getElementById("resultBox").classList.remove("hidden");
}

/* ---------- SCAN AGAIN ---------- */
function scanAgain() {
  document.getElementById("resultBox").classList.add("hidden");
  document.getElementById("homeActions").classList.remove("hidden");
  document.getElementById("message").innerText = "";
}

/* ---------- LOGIN ---------- */
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const msg = document.getElementById("loginMessage");

  if (!email || !password) {
    msg.innerText = "Please fill all fields.";
    return;
  }

  localStorage.setItem("token", "dummy_token");
  userToken = "dummy_token";
  window.location.href = "index.html";
}

/* ---------- REGISTER ---------- */
function register() {
  const first = document.getElementById("firstName").value;
  const last = document.getElementById("lastName").value;
  const email = document.getElementById("registerEmail").value;
  const pass = document.getElementById("registerPassword").value;
  const confirm = document.getElementById("confirmPassword").value;
  const msg = document.getElementById("registerMessage");

  if (!first || !last || !email || !pass || !confirm) {
    msg.innerText = "Please fill all fields.";
    return;
  }

  if (pass !== confirm) {
    msg.innerText = "Passwords do not match.";
    return;
  }

  msg.innerText = "Registration successful!";
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
}

/* ---------- LOGOUT ---------- */
function logout() {
  localStorage.removeItem("token");
  userToken = null;
  window.location.href = "index.html";
}
