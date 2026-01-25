function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    errorMsg.innerText = "";

    if (!username || !password) {
        errorMsg.innerText = "Enter username & password";
        return;
    }

    fetch("http://localhost:8082/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
        .then(res => {
            if (!res.ok) throw new Error("Invalid credentials");

            // ✅ SAVE LOGIN STATE
            sessionStorage.setItem("adminLoggedIn", "true");

            // ✅ REDIRECT
            window.location.replace("admin.html");
        })
        .catch(err => {
            errorMsg.innerText = err.message;
        });
}
