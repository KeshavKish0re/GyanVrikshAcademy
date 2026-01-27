const BASE_URL = "https://website-backend-ye9m.onrender.com";

function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    errorMsg.innerText = "";

    if (!username || !password) {
        errorMsg.innerText = "Enter username & password";
        return;
    }

    fetch(`${BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
        .then(async res => {
            if (!res.ok) {
                throw new Error("Invalid username or password");
            }

            // ✅ SAVE LOGIN STATE (MATCHES admin.html)
            localStorage.setItem("admin", "true");

            // ✅ REDIRECT
            window.location.replace("admin.html");
        })
        .catch(err => {
            errorMsg.innerText = err.message;
        });
}
