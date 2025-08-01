const uppercaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const lowercaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', ',', '.', '<', '>', '/', '?'];

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function generatePassword() {
    let copyButton = document.querySelector('.copy');
    copyButton.innerHTML = 'copy';
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
    let numOfNumbers = document.querySelector('#num-of-numbers').value;

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
    for (let i = 0; i < numOfNumbers; i++) {
        unshuffledPassword.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }

    let password = document.querySelector('#password');
    password.append(shuffle(unshuffledPassword).join(''));
    checkPasswordStrength();
}

function resetPassword(event) {
    event.preventDefault();
    const passwordContainer = document.querySelector('.password-container');
    const copy = document.createElement('button');

    copy.classList.add('copy');
    copy.setAttribute('type', 'button');
    copy.innerHTML = 'copy';
    passwordContainer.appendChild(copy);
    copy.addEventListener('click', copyToClipboard);

    let password = document.querySelector('#password');
    let passwordStrength = document.querySelector('#password-strength');
    if (password.innerHTML.length !== 0) {
        password.innerHTML = '';
        passwordStrength.innerHTML = '';
        copy.remove();
        generatePassword();
    } else {
        generatePassword();
    }
}

function checkPasswordStrength() {
    let uppercaseCount = parseInt(document.querySelector('#num-of-uppercase-letters').value);
    let lowercaseCount = parseInt(document.querySelector('#num-of-lowercase-letters').value);
    let specialCharactersCount = parseInt(document.querySelector('#num-of-special-characters').value);
    let numbersCount = parseInt(document.querySelector('#num-of-numbers').value);
    let totalCount = uppercaseCount + lowercaseCount + specialCharactersCount + numbersCount;
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

function copyToClipboard() {
    let copyPassword = document.querySelector('#password').textContent;
    navigator.clipboard.writeText(copyPassword);
    let copyButton = document.querySelector('.copy');
    copyButton.innerHTML = 'copied';
}

document.querySelector('#password-form').addEventListener('submit', resetPassword);