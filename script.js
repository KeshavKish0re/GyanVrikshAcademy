const BASE_URL = "https://website-backend-ye9m.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enquiryForm");

  if (!form) {
    console.error("❌ enquiryForm not found in HTML");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const getValue = (id) => {
      const el = document.getElementById(id);
      if (!el) {
        console.error(`❌ Element with id="${id}" not found`);
        return null;
      }
      return el.value;
    };

    const data = {
      name: getValue("name"),
      email: getValue("email"),
      phone: getValue("phone"),
      grade: getValue("grade"),
      message: getValue("message")
    };

    if (Object.values(data).includes(null)) {
      alert("Form configuration error. Check console.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert("✅ Enquiry submitted successfully!");
        form.reset();
      } else {
        const text = await response.text();
        console.error("❌ Backend error:", text);
        alert("❌ Failed to submit enquiry");
      }
    } catch (err) {
      console.error("❌ Network / CORS error:", err);
      alert("❌ Backend not reachable");
    }
  });
});
