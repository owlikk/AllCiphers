function isEnglishLettersAndSpaces(text) {
    return /^[A-Za-z\s]+$/.test(text);
}

function caesarCipher(text, shift) {
    let result = "";
    for (const char of text) {
        if (/[a-zA-Z]/.test(char)) {
            const start = char >= 'A' && char <= 'Z' ? 65 : 97;
            const code = ((char.charCodeAt(0) - start + shift) % 26 + 26) % 26 + start;
            result += String.fromCharCode(code);
        } else {
            result += char;
        }
    }
    return result;
}

function asciiEncode(text) {
    return text.split("").map(char => char.charCodeAt(0)).join(" ");
}

function koi8Encode(text) {
    return "Encoding error.";
}

const morseDict = {
    A: ".-", B: "-...", C: "-.-.", D: "-..",
    E: ".", F: "..-.", G: "--.", H: "....",
    I: "..", J: ".---", K: "-.-", L: ".-..",
    M: "--", N: "-.", O: "---", P: ".--.",
    Q: "--.-", R: ".-.", S: "...",
    T: "-", U: "..-", V: "...-",
    W: ".--", X: "-..-", Y: "-.--", Z: "--..",
    " ": "/"
};

function morseEncode(text) {
    return text.toUpperCase().split("").map(char => morseDict[char] || "").join(" ");
}

function vigenereCipher(text, key) {
    let result = "";
    let keyIndex = 0;
    const lowerKey = key.toLowerCase();

    for (const char of text) {
        if (/[a-zA-Z]/.test(char)) {
            const shift = lowerKey.charCodeAt(keyIndex % lowerKey.length) - 97;
            const start = char >= 'A' && char <= 'Z' ? 65 : 97;
            result += String.fromCharCode((char.charCodeAt(0) - start + shift) % 26 + start);
            keyIndex++;
        } else {
            result += char;
        }
    }

    return result;
}

const baconDict = {
    A: "AAAAA", B: "AAAAB", C: "AAABA", D: "AAABB",
    E: "AABAA", F: "AABAB", G: "AABBA", H: "AABBB",
    I: "ABAAA", J: "ABAAB", K: "ABABA", L: "ABABB",
    M: "ABBAA", N: "ABBAB", O: "ABBBA", P: "ABBBB",
    Q: "BAAAA", R: "BAAAB", S: "BAABA", T: "BAABB",
    U: "BABAA", V: "BABAB", W: "BABBA", X: "BABBB",
    Y: "BBAAA", Z: "BBAAB",
    " ": "/"
};

function baconEncode(text) {
    return text.toUpperCase().split("").map(char => baconDict[char] || "").join(" ");
}

function atbashCipher(text) {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const reversedUpper = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const reversedLower = "zyxwvutsrqponmlkjihgfedcba";

    return text.split("").map(char => {
        if (upper.includes(char)) {
            return reversedUpper[upper.indexOf(char)];
        }
        if (lower.includes(char)) {
            return reversedLower[lower.indexOf(char)];
        }
        return char;
    }).join("");
}

function gronsfeldCipher(text, key) {
    let result = "";
    let keyIndex = 0;

    for (const char of text) {
        if (char !== " ") {
            const shift = parseInt(key[keyIndex % key.length], 10);
            result += String.fromCharCode(char.charCodeAt(0) + shift);
            keyIndex++;
        } else {
            result += char;
        }
    }

    return result;
}

const polybiusDict = {
    A: "11", B: "12", C: "13", D: "14", E: "15",
    F: "21", G: "22", H: "23", I: "24", J: "24",
    K: "25", L: "31", M: "32", N: "33", O: "34",
    P: "35", Q: "41", R: "42", S: "43", T: "44",
    U: "45", V: "51", W: "52", X: "53", Y: "54",
    Z: "55",
    " ": "|"
};

function polybiusEncode(text) {
    return text.toUpperCase().split("").map(char => polybiusDict[char] || "").join(" ");
}

function generatePlayfairMatrix(key) {
    const cleanKey = key.toUpperCase().replace(/J/g, "I");
    const used = new Set();
    const matrixChars = [];

    for (const char of cleanKey) {
        if (/[A-Z]/.test(char) && !used.has(char)) {
            used.add(char);
            matrixChars.push(char);
        }
    }

    for (const char of "ABCDEFGHIKLMNOPQRSTUVWXYZ") {
        if (!used.has(char)) {
            used.add(char);
            matrixChars.push(char);
        }
    }

    const matrix = [];
    for (let i = 0; i < 25; i += 5) {
        matrix.push(matrixChars.slice(i, i + 5));
    }
    return matrix;
}

function findPosition(matrix, char) {
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (matrix[row][col] === char) {
                return [row, col];
            }
        }
    }
    return null;
}

function preparePlayfairText(text) {
    const cleanText = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
    const prepared = [];
    let i = 0;

    while (i < cleanText.length) {
        const first = cleanText[i];

        if (i + 1 < cleanText.length) {
            const second = cleanText[i + 1];

            if (first === second) {
                prepared.push(first + "X");
                i += 1;
            } else {
                prepared.push(first + second);
                i += 2;
            }
        } else {
            prepared.push(first + "X");
            i += 1;
        }
    }

    return prepared;
}

function playfairCipher(text, key) {
    const matrix = generatePlayfairMatrix(key);
    const pairs = preparePlayfairText(text);
    let result = "";

    for (const pair of pairs) {
        const a = pair[0];
        const b = pair[1];

        const [row1, col1] = findPosition(matrix, a);
        const [row2, col2] = findPosition(matrix, b);

        if (row1 === row2) {
            result += matrix[row1][(col1 + 1) % 5];
            result += matrix[row2][(col2 + 1) % 5];
        } else if (col1 === col2) {
            result += matrix[(row1 + 1) % 5][col1];
            result += matrix[(row2 + 1) % 5][col2];
        } else {
            result += matrix[row1][col2];
            result += matrix[row2][col1];
        }
    }

    return result;
}

function updateFields() {
    const cipher = document.getElementById("cipher").value;
    const shiftGroup = document.getElementById("shift-group");
    const keyGroup = document.getElementById("key-group");
    const keyInput = document.getElementById("key");

    shiftGroup.classList.add("hidden");
    keyGroup.classList.add("hidden");
    keyInput.placeholder = "Enter key";

    if (cipher === "caesar") {
        shiftGroup.classList.remove("hidden");
    }

    if (cipher === "vigenere") {
        keyGroup.classList.remove("hidden");
        keyInput.placeholder = "English letters only";
    }

    if (cipher === "gronsfeld") {
        keyGroup.classList.remove("hidden");
        keyInput.placeholder = "Digits only";
    }

    if (cipher === "playfair") {
        keyGroup.classList.remove("hidden");
        keyInput.placeholder = "English letters only";
    }
}

function encrypt() {
    const cipher = document.getElementById("cipher").value;
    const text = document.getElementById("text").value;
    const shift = document.getElementById("shift").value;
    const key = document.getElementById("key").value.trim();
    const resultElement = document.getElementById("result");

    if (text === "") {
        resultElement.innerText = "Error: enter text.";
        return;
    }

    if (cipher === "caesar") {
        if (!isEnglishLettersAndSpaces(text)) {
            resultElement.innerText = "Error: English letters and spaces only.";
            return;
        }
        resultElement.innerText = caesarCipher(text, parseInt(shift, 10) || 0);
        return;
    }

    if (cipher === "ascii") {
        resultElement.innerText = asciiEncode(text);
        return;
    }

    if (cipher === "koi8") {
        resultElement.innerText = koi8Encode(text);
        return;
    }

    if (cipher === "morse") {
        if (!isEnglishLettersAndSpaces(text)) {
            resultElement.innerText = "Error: English letters and spaces only.";
            return;
        }
        resultElement.innerText = morseEncode(text);
        return;
    }

    if (cipher === "vigenere") {
        if (!isEnglishLettersAndSpaces(text)) {
            resultElement.innerText = "Error: English letters and spaces only.";
            return;
        }
        if (!/^[A-Za-z]+$/.test(key)) {
            resultElement.innerText = "Error: key must contain English letters only.";
            return;
        }
        resultElement.innerText = vigenereCipher(text, key);
        return;
    }

    if (cipher === "bacon") {
        if (!isEnglishLettersAndSpaces(text)) {
            resultElement.innerText = "Error: English letters and spaces only.";
            return;
        }
        resultElement.innerText = baconEncode(text);
        return;
    }

    if (cipher === "atbash") {
        if (!isEnglishLettersAndSpaces(text)) {
            resultElement.innerText = "Error: English letters and spaces only.";
            return;
        }
        resultElement.innerText = atbashCipher(text);
        return;
    }

    if (cipher === "gronsfeld") {
        if (!/^\d+$/.test(key)) {
            resultElement.innerText = "Error: key must contain digits only.";
            return;
        }
        resultElement.innerText = gronsfeldCipher(text, key);
        return;
    }

    if (cipher === "polybius") {
        if (!isEnglishLettersAndSpaces(text)) {
            resultElement.innerText = "Error: English letters and spaces only.";
            return;
        }
        resultElement.innerText = polybiusEncode(text);
        return;
    }

    if (cipher === "playfair") {
        if (!isEnglishLettersAndSpaces(text)) {
            resultElement.innerText = "Error: English letters and spaces only.";
            return;
        }
        if (!/^[A-Za-z]+$/.test(key)) {
            resultElement.innerText = "Error: key must contain English letters only.";
            return;
        }
        resultElement.innerText = playfairCipher(text, key);
        return;
    }

    resultElement.innerText = "Invalid choice.";
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cipher").addEventListener("change", updateFields);
    document.getElementById("encrypt-btn").addEventListener("click", encrypt);
    updateFields();
});
