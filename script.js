const BASE_URL = "https://website-backend-ye9m.onrender.com";

document.getElementById("enquiryForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    grade: document.getElementById("grade").value,
    message: document.getElementById("message").value
  };

  try {
    const response = await fetch(`${BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("Enquiry submitted successfully!");
      document.getElementById("enquiryForm").reset();
    } else {
      alert("Failed to submit enquiry");
    }
  } catch (err) {
    alert("Backend not reachable");
    console.error(err);
  }
});
