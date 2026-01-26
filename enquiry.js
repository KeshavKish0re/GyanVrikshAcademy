document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("enquiryForm");
    const responseMsg = document.getElementById("responseMsg");

    if (!form) {
        console.error("Form not found");
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const data = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            grade: form.grade.value,
            message: form.message.value
        };

        fetch("https://website-backend-ye9m.onrender.com/api/enquiry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) throw new Error("Request failed");
                return res.json(); // backend returns Enquiry object
            })
            .then(() => {
                responseMsg.innerText = "✅ Enquiry submitted successfully!";
                responseMsg.style.color = "green";
                form.reset();
            })
            .catch(err => {
                responseMsg.innerText = "❌ Backend not reachable / error occurred";
                responseMsg.style.color = "red";
                console.error(err);
            });
    });
});
