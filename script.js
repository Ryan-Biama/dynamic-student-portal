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

// ---------- Lab 9: Objects, DOM & Fetch API ----------

// Demo: an object with properties and a method (Lab 9 objective)
const demoStudent = {
  name: "Amina Wanjiru",
  course: "Computer Science",
  year: 3,
  describe() {
    return this.name + " studies " + this.course + " (Year " + this.year + ")";
  }
};
console.log(demoStudent.describe());

// Step 2: reads properties from a student object instead of a plain string
function addStudentToPage(student) {
  const list = document.getElementById("student-list");
  const item = document.createElement("li");
  item.textContent = student.name + " - " + student.course + " (Year " + student.year + ")";
  list.appendChild(item);
}

// Step 3: update the heading with the total count
function updateStudentCount(count) {
  const heading = document.getElementById("student-count");
  if (heading) {
    heading.textContent = "Registered Students (" + count + ")";
  }
}

function displayAllStudents(students) {
  const list = document.getElementById("student-list");
  list.innerHTML = ""; // clear first so repeated clicks don't duplicate

  for (let i = 0; i < students.length; i++) {
    addStudentToPage(students[i]);
  }
  updateStudentCount(students.length);
}

// Steps 5-6: fetch the JSON, with error handling
async function loadStudents() {
  const list = document.getElementById("student-list");

  try {
    const response = await fetch("students.json");

    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }

    const students = await response.json();
    displayAllStudents(students);
  } catch (error) {
    console.error("Could not load students:", error);
    list.innerHTML = "<li>Sorry, the student list could not be loaded. Please try again later.</li>";
  }
}

// Button now loads the data from the JSON file
const showButton = document.getElementById("show-students");

if (showButton) {
  showButton.addEventListener("click", loadStudents);
}