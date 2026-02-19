if (localStorage.getItem("admin") !== "yes") {
  location.href = "admin.html";
}

let students = JSON.parse(localStorage.getItem("students")) || [];
let selected = -1;

function render() {
  list.innerHTML = "";
  students.forEach((s, i) => {
    const li = document.createElement("li");
    li.innerText = `${s.roll} - ${s.name}`;
    li.onclick = () => selectStudent(i);
    list.appendChild(li);
  });
}

function selectStudent(i) {
  selected = i;
  name.value = students[i].name;
  roll.value = students[i].roll;
}

function saveStudent() {
  if (!name.value || !roll.value) return;
  if (selected === -1)
    students.push({ name: name.value, roll: roll.value });
  else
    students[selected] = { name: name.value, roll: roll.value };

  localStorage.setItem("students", JSON.stringify(students));
  render();
}

function deleteStudent() {
  if (selected === -1) return;
  students.splice(selected, 1);
  localStorage.setItem("students", JSON.stringify(students));
  render();
}

render();
