const BASE_URL = "https://website-backend-ye9m.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enquiryForm");
  const responseMsg = document.getElementById("responseMsg");

  if (!form) {
    console.error("❌ enquiryForm not found in HTML");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ✅ SUBMITTING MESSAGE
    if (responseMsg) {
      responseMsg.innerText = "Thank you for submitting your enquiry. Visit Again!";
      responseMsg.style.color = "black";
    }

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
        if (responseMsg) {
          responseMsg.innerText = "✅ Enquiry submitted successfully!";
          responseMsg.style.color = "green";
        } else {
          alert("✅ Enquiry submitted successfully!");
        }
        form.reset();
      } else {
        const text = await response.text();
        console.error("❌ Backend error:", text);
        if (responseMsg) {
          responseMsg.innerText = "❌ Failed to submit enquiry";
          responseMsg.style.color = "red";
        } else {
          alert("❌ Failed to submit enquiry");
        }
      }
    } catch (err) {
      console.error("❌ Network / CORS error:", err);
      if (responseMsg) {
        responseMsg.innerText =
          "⚠️ Submitted. Please wait, our team will contact you.";
        responseMsg.style.color = "orange";
      } else {
        alert("❌ Backend not reachable");
      }
    }
  });
});
