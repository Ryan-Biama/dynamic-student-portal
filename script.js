// ---------- Step 2: Welcome message (homepage only) ----------
if (document.body.dataset.page === "home") {
  alert("Welcome to the Dynamic Student Portal!");
  console.log("Homepage loaded successfully.");
}

// ---------- Step 3: Variables and conditionals ----------
const studentName = "Amina";
let yearOfStudy = 3;

if (yearOfStudy === 1) {
  console.log(studentName + " is a first-year student. Welcome!");
} else if (yearOfStudy === 2) {
  console.log(studentName + " is a second-year student.");
} else {
  console.log(studentName + " is a senior student (year " + yearOfStudy + ").");
}

// ---------- Step 4: For loop ----------
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

// ---------- Step 5: Basic form validation (register page) ----------
const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    const name = document.getElementById("fullname").value.trim();

    if (name === "") {
      event.preventDefault(); // stop the form from submitting
      alert("Please enter your full name.");
    }
  });
}

// ---------- Lab 8: Functions & Events ----------

// Step 1: hardcoded placeholder data
const students = [
  "Amina Wanjiru",
  "Brian Otieno",
  "Cynthia Mutua",
  "David Kiptoo",
  "Esther Njeri"
];

// Step 2: add one student to the page
function addStudentToPage(name) {
  const list = document.getElementById("student-list");
  const item = document.createElement("li");
  item.textContent = name;
  list.appendChild(item);
}

// Step 3: loop through the array and add every student
function displayAllStudents(students) {
  const list = document.getElementById("student-list");
  list.innerHTML = ""; // Step 5: clear the list first, so repeated clicks don't duplicate

  for (let i = 0; i < students.length; i++) {
    addStudentToPage(students[i]);
  }
}

// Step 4: button click event
const showButton = document.getElementById("show-students");

if (showButton) {
  showButton.addEventListener("click", function () {
    displayAllStudents(students);
  });
}