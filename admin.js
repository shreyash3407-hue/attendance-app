// ===============================
// ADMIN LOGIN CHECK
// ===============================
if (localStorage.getItem("admin") !== "yes") {
  window.location.href = "admin.html";
}

// ===============================
// LOAD STUDENTS
// ===============================
let students = JSON.parse(localStorage.getItem("students")) || [];

// ===============================
// GET HTML ELEMENTS (IMPORTANT)
// ===============================
const nameInput = document.getElementById("name");
const rollInput = document.getElementById("roll");
const list = document.getElementById("list");

let selectedIndex = -1;

// ===============================
// SHOW STUDENT LIST
// ===============================
function renderList() {
  list.innerHTML = "";

  students.forEach((student, index) => {
    const li = document.createElement("li");
    li.innerText = student.roll + " - " + student.name;

    li.onclick = function () {
      selectStudent(index);
    };

    list.appendChild(li);
  });
}

// ===============================
// SELECT STUDENT TO EDIT
// ===============================
function selectStudent(index) {
  selectedIndex = index;
  nameInput.value = students[index].name;
  rollInput.value = students[index].roll;
}

// ===============================
// ADD OR UPDATE STUDENT
// ===============================
function saveStudent() {
  const name = nameInput.value.trim();
  const roll = rollInput.value.trim();

  if (name === "" || roll === "") {
    alert("Please enter Name and Roll Number");
    return;
  }

  if (selectedIndex === -1) {
    // ADD NEW
    students.push({ name: name, roll: roll });
  } else {
    // UPDATE EXISTING
    students[selectedIndex].name = name;
    students[selectedIndex].roll = roll;
  }

  localStorage.setItem("students", JSON.stringify(students));

  nameInput.value = "";
  rollInput.value = "";
  selectedIndex = -1;

  renderList();
  alert("Student saved successfully");
}

// ===============================
// DELETE STUDENT
// ===============================
function deleteStudent() {
  if (selectedIndex === -1) {
    alert("Select a student first");
    return;
  }

  students.splice(selectedIndex, 1);
  localStorage.setItem("students", JSON.stringify(students));

  nameInput.value = "";
  rollInput.value = "";
  selectedIndex = -1;

  renderList();
  alert("Student deleted");
}

// ===============================
// INITIAL LOAD
// ===============================
renderList();
