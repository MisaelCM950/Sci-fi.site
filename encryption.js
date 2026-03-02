const lengthSlider = document.getElementById('password-length');
const lengthDisplay = document.getElementById('length-display');

lengthSlider.addEventListener("input", function(){
    lengthDisplay.textContent = lenghtSlider.value;
})

function generateKey(){
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

let allowedChars = lowercaseChars;

if(document.getElementById("inc-uppercase").checked){
    allowedChars += uppercaseChars;
}
if(document.getElementById("inc-numbers").checked){
    allowedChars += numberChars;
}
if(document.getElementById("inc-symbols").checked){
    allowedChars += symbolChars;
}

let finalKey = "";

console.log("Allowed characters: " + allowedChars);

const passwordLength = document.getElementById("password-length").value;

for(let i = 0; i < passwordLength; i++){
    let randomIndex = Math.floor(Math.random() * allowedChars.length);
    finalKey += allowedChars[randomIndex];
}

document.getElementById('password-output').value = finalKey;
}

