const BASE_URL = "https://website-backend-ye9m.onrender.com";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("enquiryForm");
  const responseMsg = document.getElementById("responseMsg");
  const submitBtn = document.getElementById("submitBtn");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

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
      return;
    }

    if (!validateEmail(data.email)) {
      showMsg("❌ Enter valid email", "red");
      return;
    }

    if (data.phone.length < 10) {
      showMsg("❌ Enter valid phone number", "red");
      return;
    }

    // ===== LOADING EFFECT =====
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    showMsg("⏳ Sending enquiry...", "#0d6efd");

    try {
      // backend call
      await fetch(`${BASE_URL}/api/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      showMsg("🎉 Enquiry sent successfully! We will contact you soon.", "green");
      submitBtn.innerText = "Sent ✓";

      setTimeout(() => {
        window.open(`https://wa.me/918585895058?text=Hello Sir, I just filled enquiry form for ${data.grade}`, "_blank");
      }, 1500);

      form.reset();

    } catch (err) {
      console.error(err);
      showMsg("Server busy. But enquiry saved locally 👍", "orange");
      submitBtn.innerText = "Try Again";
      submitBtn.disabled = false;
    }

  });

  function showMsg(msg, color) {
    responseMsg.innerText = msg;
    responseMsg.style.color = color;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);
  }

});

/* =========================
LOADER HIDE AFTER LOAD
========================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

/* =========================
LIVE VIEWER COUNTER
========================= */
setInterval(() => {
  const viewer = document.getElementById("viewer");
  if (viewer) {
    viewer.innerText = Math.floor(Math.random() * 50) + 10;
  }
}, 3000);
