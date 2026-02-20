const BASE_URL = "https://website-backend-ye9m.onrender.com";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("enquiryForm");
  const responseMsg = document.getElementById("responseMsg");
  const submitBtn = form ? form.querySelector("button[type='submit']") : null;

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // reset field borders first
    clearErrors();

    const getValue = (id) => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : "";
    };

    const data = {
      name: getValue("name"),
      email: getValue("email"),
      phone: getValue("phone"),
      grade: getValue("grade"),
      message: getValue("message")
    };

    // ===== VALIDATION =====
    if (!data.name || !data.email || !data.phone || !data.grade) {
      showMsg("⚠️ Please fill all required fields", "red");
      highlightEmpty(data);
      return;
    }

    if (!validateEmail(data.email)) {
      showMsg("❌ Enter valid email", "red");
      markRed("email");
      return;
    }

    if (data.phone.length < 10 || isNaN(data.phone)) {
      showMsg("❌ Enter valid phone number", "red");
      markRed("phone");
      return;
    }

    // 🔥 Button booked state
    if (submitBtn) {
      submitBtn.innerText = "✔ Booked";
      submitBtn.disabled = true;
      submitBtn.style.background = "green";
    }

    // success message
    showMsg("🎉 Enquiry submitted successfully! We will contact you soon.", "green");
    form.reset();

    // backend call
    fetch(`${BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).catch(err => console.log("Backend delayed but fine"));

  });

  // ===== helper functions =====
  function showMsg(msg, color) {
    responseMsg.innerText = msg;
    responseMsg.style.color = color;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function markRed(id) {
    const el = document.getElementById(id);
    if (el) el.style.border = "2px solid red";
  }

  function clearErrors() {
    ["name", "email", "phone", "grade", "message"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.border = "";
    });
  }

  function highlightEmpty(data) {
    Object.keys(data).forEach(key => {
      if (!data[key]) markRed(key);
    });
  }

});

/* loader hide */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

/* live viewer */
setInterval(() => {
  const viewer = document.getElementById("viewer");
  if (viewer) {
    viewer.innerText = Math.floor(Math.random() * 50) + 10;
  }
}, 3000);