function isEnglishLettersAndSpaces(text) {
    return /^[A-Za-z\s]+$/.test(text);
}

function caesarCipher(text, shift) {
    let result = "";
    for (let char of text) {
        if (/[a-zA-Z]/.test(char)) {
            let start = char === char.toUpperCase() ? 65 : 97;
            let code = ((char.charCodeAt(0) - start + shift) % 26 + 26) % 26 + start;
            result += String.fromCharCode(code);
        } else {
            result += char;
        }
    }
    return result;
}

function asciiEncode(text) {
    return text.split('').map(char => char.charCodeAt(0)).join(' ');
}

function koi8Encode(text) {
    return "Encoding error.";
}

const morseDict = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..',
    'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...',
    'T': '-', 'U': '..-', 'V': '...-',
    'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
    ' ': '/'
};

function morseEncode(text) {
    return text.toUpperCase().split('').map(char => morseDict[char] || '').join(' ');
}

function vigenereCipher(text, key) {
    let result = "";
    key = key.toLowerCase();
    let keyIndex = 0;

    for (let char of text) {
        if (/[a-zA-Z]/.test(char)) {
            let shift = key.charCodeAt(keyIndex % key.length) - 97;
            let start = char === char.toUpperCase() ? 65 : 97;
            result += String.fromCharCode((char.charCodeAt(0) - start + shift) % 26 + start);
            keyIndex++;
        } else {
            result += char;
        }
    }

    return result;
}

const baconDict = {
    'A': 'AAAAA', 'B': 'AAAAB', 'C': 'AAABA', 'D': 'AAABB',
    'E': 'AABAA', 'F': 'AABAB', 'G': 'AABBA', 'H': 'AABBB',
    'I': 'ABAAA', 'J': 'ABAAB', 'K': 'ABABA', 'L': 'ABABB',
    'M': 'ABBAA', 'N': 'ABBAB', 'O': 'ABBBA', 'P': 'ABBBB',
    'Q': 'BAAAA', 'R': 'BAAAB', 'S': 'BAABA', 'T': 'BAABB',
    'U': 'BABAA', 'V': 'BABAB', 'W': 'BABBA', 'X': 'BABBB',
    'Y': 'BBAAA', 'Z': 'BBAAB',
    ' ': '/'
};

function baconEncode(text) {
    return text.toUpperCase().split('').map(char => baconDict[char] || '').join(' ');
}

function atbashCipher(text) {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const reversedUpper = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
    const reversedLower = "zyxwvutsrqponmlkjihgfedcba";

    return text.split('').map(char => {
        if (upper.includes(char)) {
            return reversedUpper[upper.indexOf(char)];
        }
        if (lower.includes(char)) {
            return reversedLower[lower.indexOf(char)];
        }
        return char;
    }).join('');
}

function gronsfeldCipher(text, key) {
    let result = "";
    let keyIndex = 0;

    for (let char of text) {
        if (char !== ' ') {
            let shift = parseInt(key[keyIndex % key.length], 10);
            result += String.fromCharCode(char.charCodeAt(0) + shift);
            keyIndex++;
        } else {
            result += char;
        }
    }

    return result;
}

const polybiusDict = {
    'A': '11', 'B': '12', 'C': '13', 'D': '14', 'E': '15',
    'F': '21', 'G': '22', 'H': '23', 'I': '24', 'J': '24',
    'K': '25', 'L': '31', 'M': '32', 'N': '33', 'O': '34',
    'P': '35', 'Q': '41', 'R': '42', 'S': '43', 'T': '44',
    'U': '45', 'V': '51', 'W': '52', 'X': '53', 'Y': '54',
    'Z': '55',
    ' ': '|'
};

function polybiusEncode(text) {
    return text.toUpperCase().split('').map(char => polybiusDict[char] || '').join(' ');
}

function generatePlayfairMatrix(key) {
    key = key.toUpperCase().replace(/J/g, 'I');
    let used = new Set();
    let matrixChars = [];

    for (let char of key) {
        if (/[A-Z]/.test(char) && !used.has(char)) {
            used.add(char);
            matrixChars.push(char);
        }
    }

    for (let char of "ABCDEFGHIKLMNOPQRSTUVWXYZ") {
        if (!used.has(char)) {
            used.add(char);
            matrixChars.push(char);
        }
    }

    let matrix = [];
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
    text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    let prepared = [];
    let i = 0;

    while (i < text.length) {
        let first = text[i];
        let second = i + 1 < text.length ? text[i + 1] : null;

        if (!second) {
            prepared.push(first + 'X');
            i += 1;
        } else if (first === second) {
            prepared.push(first + 'X');
            i += 1;
        } else {
            prepared.push(first + second);
            i += 2;
        }
    }

    return prepared;
}

function playfairCipher(text, key) {
    let matrix = generatePlayfairMatrix(key);
    let pairs = preparePlayfairText(text);
    let result = "";

    for (let pair of pairs) {
        let a = pair[0];
        let b = pair[1];
        let [row1, col1] = findPosition(matrix, a);
        let [row2, col2] = findPosition(matrix, b);

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

function toggleFields() {
    const cipher = document.getElementById("cipher").value;
    const shiftGroup = document.getElementById("shift-group");
    const keyGroup = document.getElementById("key-group");

    shiftGroup.style.display = cipher === "caesar" ? "block" : "none";
    keyGroup.style.display = ["vigenere", "gronsfeld", "playfair"].includes(cipher) ? "block" : "none";
}

function encrypt() {
    const cipher = document.getElementById("cipher").value;
    const text = document.getElementById("text").value;
    const shift = document.getElementById("shift").value;
    const key = document.getElementById("key").value;
    const resultElement = document.getElementById("result");

    if (!text) {
        resultElement.innerText = "Error: enter text.";
        return;
    }

    if (["caesar", "morse", "vigenere", "bacon", "atbash", "polybius", "playfair"].includes(cipher)) {
        if (!isEnglishLettersAndSpaces(text)) {
            resultElement.innerText = "Error: English letters and spaces only.";
            return;
        }
    }

    if (cipher === "caesar") {
        resultElement.innerText = caesarCipher(text, parseInt(shift, 10) || 0);
    } else if (cipher === "ascii") {
        resultElement.innerText = asciiEncode(text);
    } else if (cipher === "koi8") {
        resultElement.innerText = koi8Encode(text);
    } else if (cipher === "morse") {
        resultElement.innerText = morseEncode(text);
    } else if (cipher === "vigenere") {
        if (!/^[A-Za-z]+$/.test(key)) {
            resultElement.innerText = "Error: key must contain English letters only.";
            return;
        }
        resultElement.innerText = vigenereCipher(text, key);
    } else if (cipher === "bacon") {
        resultElement.innerText = baconEncode(text);
    } else if (cipher === "atbash") {
        resultElement.innerText = atbashCipher(text);
    } else if (cipher === "gronsfeld") {
        if (!/^\d+$/.test(key)) {
            resultElement.innerText = "Error: key must contain digits only.";
            return;
        }
        resultElement.innerText = gronsfeldCipher(text, key);
    } else if (cipher === "polybius") {
        resultElement.innerText = polybiusEncode(text);
    } else if (cipher === "playfair") {
        if (!/^[A-Za-z]+$/.test(key)) {
            resultElement.innerText = "Error: key must contain English letters only.";
            return;
        }
        resultElement.innerText = playfairCipher(text, key);
    } else {
        resultElement.innerText = "Invalid choice.";
    }
}

window.onload = toggleFields;
