const lengthSlid = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const passwordInput = document.querySelector(".input-box input");
const generateBtn = document.querySelector(".generate-btn");
const passIndicator = document.querySelector(".pass-indicator");
const copyIcon = document.querySelector(".input-box span");

// 2 : characters object
const characters = {
  // object of letters, numbers & symblos
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
}; // object properties must be the same as HTML element

// 3 : fucntion that generate password from object
const generatePassword = () => {
  let staticPassword = "";
  let passLength = lengthSlid.value;
  let randonPassword = "";
  let excludeDuplicate = false;

  options.forEach((option) => {
    // looping through each option's checkbox
    if (option.checked) {
      // if checkbox is checked
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id]; // adding particular key value from chraacter object to staticPassword
      } else if (option.id === "spaces") {
        // id checkbox id is spaces
        staticPassword = ` ${staticPassword}`;
      } else {
        // else pass true value to excludeDuplicate
        excludeDuplicate = true;
      }
    }
  });
  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)]; // getting random character from static password
    if (excludeDuplicate) {
      // if exludeDuplicate is true
      if (!randonPassword.includes(randomChar) || randomChar == " ") {
        // if random password dosen't contains the current random character or is
        randonPassword += randomChar; // equal to spaces " " then add random character to randomPassword
      } // else decrement i by -1
      else {
        i--;
      }
    } else {
      randonPassword += randomChar;
    }
  }
  passwordInput.value = randonPassword; // display the password
};

// 4 : update indcator id to change color (css)
const updatePassIndicator = () => {
  if (lengthSlid.value <= 8) {
    passIndicator.id = "weak";
  } else if (lengthSlid.value <= 16) {
    passIndicator.id = "medium";
  } else {
    passIndicator.id = "strong";
  }
};

// 1 : length functions
const updateSlider = () => {
  document.querySelector(".pass-length span").textContent = lengthSlid.value;
  generatePassword(); // update the password while increasing or decreasing the length
  updatePassIndicator();
};
updateSlider();

// 5 : copy password
const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.textContent = "copied";
  setTimeout(() => {
    // after 150 ms, chnaging C back to copy
    copyIcon.textContent = "C";
  }, 1500);
};

lengthSlid.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);
