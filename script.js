 const BASE_URL = "https://website-backend-ye9m.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enquiryForm");
  const responseMsg = document.getElementById("responseMsg");
  const submitBtn = document.getElementById("submitBtn");

  if (!form) {
    console.error("❌ enquiryForm not found in HTML");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const getValue = (id) => {
      const el = document.getElementById(id);
      if (!el) return "";
      return el.value.trim();
    };

    const data = {
      name: getValue("name"),
      email: getValue("email"),
      phone: getValue("phone"),
      grade: getValue("grade"),
      message: getValue("message")
    };

    // ❌ VALIDATION FIRST
    if (!data.name || !data.email || !data.phone || !data.grade || !data.message) {
      responseMsg.innerText = "❗ Please fill all the boxes";
      responseMsg.style.color = "red";
      return;
    }

    // ✅ IMMEDIATE MESSAGE (NO WAIT)
    responseMsg.innerText =
      "✅ Thank you for submitting your enquiry. Visit Again!";
    responseMsg.style.color = "green";

    submitBtn.innerText = "Submitted";
    submitBtn.disabled = true;

    // 🔹 BACKEND CALL (BACKGROUND)
    fetch(`${BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).catch(err => console.error("Backend call failed:", err));

    form.reset();
  });
});
