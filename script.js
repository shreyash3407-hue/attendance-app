const today = new Date();
todayDate.innerText = today.toDateString();

const sheetURL =
"https://script.google.com/macros/s/AKfycbwkGjfmR7cEMYO8eWU-YexVE3m7vOsEOsyAY3o_ggXs1VD_3xmTy-AErg2qZ3ihGguo/exec";

let students = JSON.parse(localStorage.getItem("students")) || [
  { name: "Rahul", roll: 1 }
];

let index = 0;

function showStudent() {
  if (students.length === 0) {
    studentName.innerText = "No Students";
    rollNo.innerText = "";
    return;
  }
  studentName.innerText = students[index].name;
  rollNo.innerText = "Roll No: " + students[index].roll;
}

function mark(status) {
  fetch(sheetURL, {
    method: "POST",
    body: JSON.stringify({
      name: students[index].name,
      roll: students[index].roll,
      status: status
    })
  });

  let data = JSON.parse(localStorage.getItem("attendance")) || [];
  data.push({ ...students[index], status, date: today.toDateString() });
  localStorage.setItem("attendance", JSON.stringify(data));

  index++;
  if (index >= students.length) index = 0;
  showStudent();
}

showStudent();
