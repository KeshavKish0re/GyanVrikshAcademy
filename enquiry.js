document.addEventListener("DOMContentLoaded", function () {

    console.log("ENQUIRY JS LOADED");

    const form = document.getElementById("enquiryForm");
    const responseMsg = document.getElementById("responseMsg");

    if (!form) {
        console.error("Form NOT found");
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = {
            name: form.elements["name"].value.trim(),
            email: form.elements["email"].value.trim(),
            phone: form.elements["phone"].value.trim(),
            grade: form.elements["grade"].value.trim(),
            message: form.elements["message"].value.trim()
        };

        console.log("FORM DATA:", formData);

        fetch("https://website-backend-ye9m.onrender.com/api/enquiry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Server responded with error");
                }
                return res.text(); // backend text/void safe
            })
            .then(() => {
                responseMsg.innerText = "✅ Enquiry submitted successfully!";
                responseMsg.style.color = "green";
                form.reset();
            })
            .catch(err => {
                responseMsg.innerText = "❌ Failed to submit enquiry. Try again.";
                responseMsg.style.color = "red";
                console.error("ENQUIRY ERROR:", err);
            });
    });
});
