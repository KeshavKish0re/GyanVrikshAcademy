document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("enquiryForm");
    const responseMsg = document.getElementById("responseMsg");
    const submitBtn = form.querySelector("button[type='submit']");

    let isSubmitting = false; // 🔑 guard

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (isSubmitting) return; // ❌ second call blocked
        isSubmitting = true;

        submitBtn.disabled = true;
        submitBtn.innerText = "Submitting...";

        const data = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            grade: form.grade.value,
            message: form.message.value
        };

        fetch("https://website-backend-ye9m.onrender.com/api/enquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed");
                return res.text();
            })
            .then(() => {
                responseMsg.innerText = "✅ Enquiry submitted successfully!";
                responseMsg.style.color = "green";
                form.reset();
            })
            .catch(() => {
                responseMsg.innerText =
                    "⚠️ Submitted. Please wait, our team will contact you.";
                responseMsg.style.color = "orange";
            })
            .finally(() => {
                isSubmitting = false;
                submitBtn.disabled = false;
                submitBtn.innerText = "Submit";
            });
    });
});
