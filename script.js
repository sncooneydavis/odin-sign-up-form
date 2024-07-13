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

const textAlertCheckbox = document.querySelector("#alerts-signup");
const phoneDropDown = document.querySelector(".phone.dropdown");

textAlertCheckbox.addEventListener("change", () => {
    if (phoneDropDown.classList.contains("hidden")) {
        phoneDropDown.classList.remove("hidden");
    }
    else {
        phoneDropDown.classList.add("hidden");
    }
})

// FORMAT PHONE INPUT 
const phoneInput = document.querySelector("#phone");
phoneInput.addEventListener('input', function (e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
})

// DYNAMIC INLINE VALIDATION
class FormValidate {
    constructor(form) {
        this.form = form;
        this.form.noValidate = true;
        this.rulesViolatedCount = this.form.querySelectorAll('.hint').length;
        this.typesToCheck = ["text", "password", "email"];
        this.form.addEventListener('focus', e => this.focusHandler(e), true);
        this.form.addEventListener('blur', e => this.blurHandler(e), true);
        this.form.addEventListener('submit', e => this.submitHandler(e));    
    }
    focusHandler(e) {
        const target = e.target;
        if (target.tagName.toLowerCase() === 'button') {
            return;
        }
        const targetName = target.name;
        if (this.form.querySelector(`.hint.${targetName}`)) {
            const hints = this.form.querySelectorAll(`.hint.${targetName}`);
            hints.forEach(hint => hint.classList.remove("hidden"));
        }
    }
    blurHandler(e) {
        const target = e.target;
        if (this.typesToCheck.includes(target.type)) {
            this.validateField(target);
        }
    }
    submitHandler(e) {
        e.preventDefault();
        const inputFields = this.form.querySelectorAll('input');
        inputFields.forEach(input => {
            if (this.typesToCheck.includes(input.type)) {
                this.validateField(input);
            }
        }) 
        if (textAlertCheckbox.checked && (phoneInput.validity.patternMismatch || phoneInput.value=="")) {
            phoneDropDown.querySelector('.dropdown-hint').classList.remove('hidden');
            phoneDropDown.querySelector('.dropdown-hint').classList.add('bad-input');
            return;
        }
        else{
            if (this.rulesViolatedCount === 0) {
                const formData = new FormData(this.form);
                console.log(...formData);
                // add SUBMIT logic
            }   
        }  
    } 
    validateField(target) {
        const validityState = target.validity;
        const targetContainer = target.closest('.input.section');
        // length
        if (targetContainer.querySelector(".hint.length")) {
            const hintEle = targetContainer.querySelector(".hint.length");
            if (!validityState.tooLong && !validityState.tooShort && target.value.trim() !== "") {
                hintEle.classList.add("hidden");
                hintEle.classList.remove("bad-input");
                this.rulesViolatedCount--;
            }
            else if (validityState.tooLong || validityState.tooShort || target.value.trim() == "") {
                hintEle.classList.remove("hidden");
                hintEle.classList.add("bad-input");
            }
        }
        // pattern 
        if (targetContainer.querySelector(".hint.pattern")) {
            const hintEle = targetContainer.querySelector(".hint.pattern");
            if (!validityState.patternMismatch && target.value.trim() !== "") {
                hintEle.classList.add("hidden");
                hintEle.classList.remove("bad-input");
                this.rulesViolatedCount--;
            }
            else if (validityState.patternMismatch || target.value.trim() == "") {
                hintEle.classList.add("bad-input");
                hintEle.classList.remove("hidden");
            }
        }
        // type: emails
        if (targetContainer.querySelector(".hint.email")){
            const hintEle = targetContainer.querySelector(".hint.email");
            if (!validityState.typeMismatch && target.value.trim() !== "") {
                hintEle.classList.add("hidden");  
                hintEle.classList.remove("bad-input");
                this.rulesViolatedCount--;
            }
            else if (validityState.typeMismatch || target.value.trim() == "") {
                hintEle.classList.remove("hidden");
                hintEle.classList.add("bad-input");
            }
        }
        // match
        if (targetContainer.querySelector(".hint.confirm-password")) {
            const inputtedPasswordValue = this.form.querySelector('#new-password').value;
            const confirmationPasswordValue = this.form.querySelector('#confirm-password').value;
            const confirmationPasswordHint = targetContainer.querySelector(".hint.confirm-password");
            if (inputtedPasswordValue === confirmationPasswordValue && target.value.trim() !== "") {
                confirmationPasswordHint.classList.add('hidden');
                confirmationPasswordHint.classList.remove("bad-input");
                this.rulesViolatedCount--;
            }
            else if (inputtedPasswordValue != confirmationPasswordValue || target.value.trim() == "") {
                confirmationPasswordHint.classList.remove("hidden");
                confirmationPasswordHint.classList.add('bad-input');
            }
        }
    }
}

const signUpFormEle = new FormValidate(document.getElementById('sign-up-form'));
