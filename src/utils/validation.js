import { regexEmail, regexName, regexPassword } from '../StaticData/regex';

export const validateName = (name) => {
    if (!name) return 'Name is required';
    if (!regexName.test(name)) return 'Name is not valid'
    return null;
}

export const validateEmpty = (name, text) =>{
    if (!name) return ` ${text} is required`;
    return null;
}

export const validateEmail = (email) => {
    if (!email) return 'Email is required';
    if (!regexEmail.test(email)) return 'Enter a valid email';
    return null;
};

export const validatePassword = (password, confirmPassword) => {
    if (!password) return 'Password is required';
    // if (!regexPassword.test(password)) return 'Password is too weak';
    if (confirmPassword !== undefined && password !== confirmPassword) return 'Passwords did not match';
    return null;
};

export const dropDownValidate = (option, optionName) => {
    if (!option) return `Select ${optionName} please.`
    return null;
}

export const validateUserForm = (user) => {
    const errors = {};
    errors.nameError = validateName(user.name);
    errors.emailError = validateEmail(user.email);
    errors.passwordError = validatePassword(user.password);
    return errors;
};
