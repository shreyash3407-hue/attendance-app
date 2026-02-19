// ===============================
// SHOW TODAY'S DATE (SAFE METHOD)
// ===============================
window.onload = function () {

  const today = new Date();
  const dateBox = document.getElementById("todayDate");
  if (dateBox) {
    dateBox.innerText = today.toDateString();
  }

  showStudent();
};

// ===============================
// GOOGLE SHEET URL
// ===============================
const sheetURL =
  "https://script.google.com/macros/s/AKfycbwkGjfmR7cEMYO8eWU-YexVE3m7vOsEOsyAY3o_ggXs1VD_3xmTy-AErg2qZ3ihGguo/exec";

// ===============================
// LOAD STUDENTS
// ===============================
let students = JSON.parse(localStorage.getItem("students")) || [
  { name: "Rahul", roll: 1 },
  { name: "Amit", roll: 2 },
  { name: "Sneha", roll: 3 }
];

let index = 0;

// ===============================
// SHOW CURRENT STUDENT
// ===============================
function showStudent() {
  const nameEl = document.getElementById("studentName");
  const rollEl = document.getElementById("rollNo");

  if (students.length === 0) {
    nameEl.innerText = "No Students";
    rollEl.innerText = "";
    return;
  }

  if (index >= students.length) {
    index = 0; // reset safely
  }

  nameEl.innerText = students[index].name;
  rollEl.innerText = "Roll No: " + students[index].roll;
}

// ===============================
// MARK ATTENDANCE
// ===============================
function mark(status) {
  const student = students[index];

  // send to Google Sheet
  fetch(sheetURL, {
    method: "POST",
    body: JSON.stringify({
      name: student.name,
      roll: student.roll,
      status: status
    })
  }).catch(() => {});

  // save locally for summary
  let attendance =
    JSON.parse(localStorage.getItem("attendance")) || [];

  attendance.push({
    name: student.name,
    roll: student.roll,
    status: status,
    date: new Date().toDateString()
  });

  localStorage.setItem(
    "attendance",
    JSON.stringify(attendance)
  );

  // move to next student
  index++;
  showStudent();
}
