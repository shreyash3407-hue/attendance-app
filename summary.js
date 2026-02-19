const data = JSON.parse(localStorage.getItem("attendance")) || [];
present.innerText = "Present: " + data.filter(d => d.status === "Present").length;
absent.innerText = "Absent: " + data.filter(d => d.status === "Absent").length;
