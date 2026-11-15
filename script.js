// ---------- Welcome message (homepage only) ----------
if (document.body.dataset.page === "home") {
  alert("Welcome to the Dynamic Student Portal!");
  console.log("Homepage loaded successfully.");
}

// ---------- Variables, conditionals, loop (Lab 7) ----------
const studentName = "Amina";
let yearOfStudy = 3;

if (yearOfStudy === 1) {
  console.log(studentName + " is a first-year student. Welcome!");
} else if (yearOfStudy === 2) {
  console.log(studentName + " is a second-year student.");
} else {
  console.log(studentName + " is a senior student (year " + yearOfStudy + ").");
}

for (let i = 1; i <= 5; i++) {
  console.log(i);
}

// ---------- Lab 10, Steps 1 and 3: Regex patterns ----------
const namePattern = /^[A-Za-z\s]+$/;            // letters and spaces only
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // basic email shape

// ---------- Lab 10, Step 1: Student class ----------
class Student {
  constructor(name, email, course) {
    this.name = name;
    this.email = email;
    this.course = course;
  }

  getSummary() {
    return this.name + " (" + this.email + ") - " + this.course;
  }

  // Validation lives with the class that owns the data
  static isValidName(name) {
    return namePattern.test(name);
  }

  static isValidEmail(email) {
    return emailPattern.test(email);
  }
}

// ---------- Student list (Labs 8 and 9, now using Student objects) ----------
function addStudentToPage(student) {
  const list = document.getElementById("student-list");
  const item = document.createElement("li");
  item.textContent = student.getSummary();
  list.appendChild(item);
}

function updateStudentCount(count) {
  const heading = document.getElementById("student-count");
  if (heading) {
    heading.textContent = "Registered Students (" + count + ")";
  }
}

function displayAllStudents(students) {
  const list = document.getElementById("student-list");
  list.innerHTML = "";

  for (let i = 0; i < students.length; i++) {
    addStudentToPage(students[i]);
  }
  updateStudentCount(students.length);
}

async function loadStudents() {
  const list = document.getElementById("student-list");

  try {
    const response = await fetch("students.json");

    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }

    const data = await response.json();

    // Lab 10, Step 2: build Student instances from the plain JSON objects
    const students = data.map(function (s) {
      return new Student(s.name, s.email, s.course);
    });

    displayAllStudents(students);
  } catch (error) {
    console.error("Could not load students:", error);
    list.innerHTML = "<li>Sorry, the student list could not be loaded. Please try again later.</li>";
  }
}

const showButton = document.getElementById("show-students");

if (showButton) {
  showButton.addEventListener("click", loadStudents);
}

// ---------- Lab 10, Step 4: Registration form validation ----------
const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");

    // Clear any previous messages
    nameError.textContent = "";
    emailError.textContent = "";

    let isValid = true;

    if (name === "") {
      nameError.textContent = "Please enter your full name.";
      isValid = false;
    } else if (!Student.isValidName(name)) {
      nameError.textContent = "Name can only contain letters and spaces.";
      isValid = false;
    }

    if (email === "") {
      emailError.textContent = "Please enter your email address.";
      isValid = false;
    } else if (!Student.isValidEmail(email)) {
      emailError.textContent = "Please enter a valid email, e.g. name@example.com.";
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault(); // block submission
    }
  });
}