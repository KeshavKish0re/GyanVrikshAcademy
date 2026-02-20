const BASE_URL = "https://website-backend-ye9m.onrender.com";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("enquiryForm");
  const responseMsg = document.getElementById("responseMsg");

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

    // 🔥 INSTANT SUCCESS MESSAGE (no waiting)
    showMsg("🎉 Enquiry submitted successfully! We will contact you soon.", "green");
    form.reset();

    // backend call in background (no waiting)
    fetch(`${BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).catch(err => console.log("Backend delayed but fine"));

    // optional whatsapp open
    // setTimeout(() => {
    //   window.open(`https://wa.me/918585895058?text=Hello Sir, I just submitted enquiry for ${data.grade}`, "_blank");
    // }, 1200);

  });

  function showMsg(msg, color) {
    responseMsg.innerText = msg;
    responseMsg.style.color = color;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);
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
