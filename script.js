// REVEAL PASSWORD
const showPasswordBtn = document.querySelector(".show.password");
const hidePasswordBtn = document.querySelector(".hide.password");
const showConfirmPasswordBtn = document.querySelector(".show.passwordConfirm");
const hideConfirmPasswordBtn = document.querySelector(".hide.passwordConfirm");

const passwordInput = document.querySelector("#new-password");
const confirmPasswordInput = document.querySelector("#confirm-password");

showPasswordBtn.addEventListener("click", () => {
    showPasswordBtn.classList.add("hidden");
    hidePasswordBtn.classList.remove("hidden");
    passwordInput.type = "text";
});

hidePasswordBtn.addEventListener("click", () => {
    hidePasswordBtn.classList.add("hidden");
    showPasswordBtn.classList.remove("hidden");
    passwordInput.type = "password";
});

showConfirmPasswordBtn.addEventListener("click", () => {
    showConfirmPasswordBtn.classList.add("hidden");
    hideConfirmPasswordBtn.classList.remove("hidden");
    confirmPasswordInput.type = "text";
});

hideConfirmPasswordBtn.addEventListener("click", () => {
    hideConfirmPasswordBtn.classList.add("hidden");
    showConfirmPasswordBtn.classList.remove("hidden");
    confirmPasswordInput.type = "password";
});

// REVEAL PHONE INPUT FOR TEXT ALERTS
const textAlertCheckbox = document.querySelector("#signup2");
const phoneInputBox = document.querySelector(".phone-dropdown");

textAlertCheckbox.addEventListener("change", () => {
    if (phoneInputBox.classList.contains("hidden")) {
        phoneInputBox.classList.remove("hidden");
    }
    else {
        phoneInputBox.classList.add("hidden");
    }
})
