const uppercaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const lowercaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', ',', '.', '<', '>', '/', '?'];

function generatePassword() {
    function shuffle(array) {
        let remainingElements = array.length;
        let temporaryValue;
        let randomIndex;

        while (remainingElements) {
            randomIndex = Math.floor(Math.random() * remainingElements--);
            temporaryValue = array[remainingElements];
            array[remainingElements] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    let numOfUppercaseLetters = document.querySelector('#num-of-uppercase-letters').value;
    let numOfLowercaseLetters = document.querySelector('#num-of-lowercase-letters').value;
    let numOfSpecialCharacters = document.querySelector('#num-of-special-characters').value;

    let unshuffledPassword = [];

    for (let i = 0; i < numOfUppercaseLetters; i++) {
        unshuffledPassword.push(uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)]);
    }
    for (let i = 0; i < numOfLowercaseLetters; i++) {
        unshuffledPassword.push(lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)]);
    }
    for (let i = 0; i < numOfSpecialCharacters; i++) {
        unshuffledPassword.push(specialCharacters[Math.floor(Math.random() * specialCharacters.length)]);
    }

    let password = document.querySelector('#password');
    password.append(shuffle(unshuffledPassword).join(''));
    checkPasswordStrength();
}

function resetPassword(event) {
    event.preventDefault();
    let password = document.querySelector('#password');
    let passwordStrength = document.querySelector('#password-strength');
    if (password.innerHTML.length !== 0) {
        password.innerHTML = '';
        passwordStrength.innerHTML = '';
        generatePassword();
    } else {
        generatePassword();
    }
}

function checkPasswordStrength() {
    let uppercaseCount = parseInt(document.querySelector('#num-of-uppercase-letters').value);
    let lowercaseCount = parseInt(document.querySelector('#num-of-lowercase-letters').value);
    let specialCharactersCount = parseInt(document.querySelector('#num-of-special-characters').value);
    let totalCount = uppercaseCount + lowercaseCount + specialCharactersCount;
    let passwordStrength = document.querySelector('#password-strength');

    if (totalCount <= 8) {
        passwordStrength.append('Password strength: WEAK');
    } else if (totalCount >= 9 && totalCount <= 12) {
        passwordStrength.append('Password strength: MODERATE');
    } else if (totalCount > 12 && totalCount <= 16) {
        passwordStrength.append('Password strength: STRONG');
    } else {
        passwordStrength.append('Password strength: VERY STRONG');
    }
}

document.querySelector('#password-form').addEventListener('submit', resetPassword);