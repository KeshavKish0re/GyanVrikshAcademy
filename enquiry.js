document.addEventListener("DOMContentLoaded", function () {

    console.log("ENQUIRY JS LOADED");

    const form = document.getElementById("enquiryForm");

    if (!form) {
        console.error("Form NOT found");
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = {
            name: form.elements["name"].value,
            email: form.elements["email"].value,
            phone: form.elements["phone"].value,
            grade: form.elements["grade"].value,
            message: form.elements["message"].value
        };

        console.log("FORM DATA:", formData);

        fetch("http://localhost:8082/api/enquiry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(() => {
                document.getElementById("responseMsg").innerText =
                    "✅ Enquiry submitted successfully!";
                form.reset();
            })
            .catch(err => {
                document.getElementById("responseMsg").innerText =
                    "❌ Something went wrong.";
                console.error(err);
            });
    });
});
