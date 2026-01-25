let allEnquiries = [];
let currentStatusFilter = "ALL";

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");

    fetch("http://localhost:8082/api/enquiry/all")
        .then(res => res.json())
        .then(data => {
            allEnquiries = data;
            applyFilters();
        });

    // 🔍 SEARCH
    searchInput.addEventListener("input", () => {
        applyFilters();
    });
});

// 🔁 APPLY STATUS + SEARCH FILTER TOGETHER
function applyFilters() {

    const keyword = document.getElementById("searchInput").value.toLowerCase();

    let filtered = allEnquiries;

    if (currentStatusFilter !== "ALL") {
        filtered = filtered.filter(e => e.status === currentStatusFilter);
    }

    if (keyword) {
        filtered = filtered.filter(e =>
            e.name?.toLowerCase().includes(keyword) ||
            e.email?.toLowerCase().includes(keyword) ||
            e.phone?.toLowerCase().includes(keyword) ||
            e.grade?.toLowerCase().includes(keyword)
        );
    }

    renderTable(filtered);
    updateCounters(filtered);
}

// 🧱 TABLE RENDER
function renderTable(data) {

    const tableBody = document.getElementById("enquiryTableBody");
    tableBody.innerHTML = "";

    data.forEach((e, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${e.name}</td>
            <td>${e.email}</td>
            <td>${e.phone}</td>
            <td>${e.grade}</td>
            <td>${e.message ?? ""}</td>
            <td>
                <select class="form-select form-select-sm"
                        onchange="updateStatus(${e.id}, this.value)">
                    <option value="NEW" ${e.status === "NEW" ? "selected" : ""}>NEW</option>
                    <option value="CONTACTED" ${e.status === "CONTACTED" ? "selected" : ""}>CONTACTED</option>
                    <option value="ENROLLED" ${e.status === "ENROLLED" ? "selected" : ""}>ENROLLED</option>
                </select>
            </td>
            <td>
                <button class="btn btn-danger btn-sm"
                        onclick="deleteEnquiry(${e.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// 🔘 STATUS FILTER
function filterStatus(status) {
    currentStatusFilter = status;
    applyFilters();
}

// 🔁 UPDATE STATUS
function updateStatus(id, status) {
    fetch(`http://localhost:8082/api/enquiry/status/${id}?status=${status}`, {
        method: "PUT"
    }).then(() => {
        const e = allEnquiries.find(x => x.id === id);
        if (e) e.status = status;
        applyFilters();
    });
}

// ❌ DELETE
function deleteEnquiry(id) {

    if (!confirm("Delete this enquiry?")) return;

    fetch(`http://localhost:8082/api/enquiry/${id}`, {
        method: "DELETE"
    }).then(() => {
        allEnquiries = allEnquiries.filter(e => e.id !== id);
        applyFilters();
    });
}

// 📊 COUNTERS
function updateCounters(data) {

    document.getElementById("totalCount").innerText = data.length;

    document.getElementById("newCount").innerText =
        data.filter(e => e.status === "NEW").length;

    document.getElementById("contactedCount").innerText =
        data.filter(e => e.status === "CONTACTED").length;

    document.getElementById("enrolledCount").innerText =
        data.filter(e => e.status === "ENROLLED").length;
}
