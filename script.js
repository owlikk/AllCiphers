// --- Caesar ---
function caesarCipher(text, shift) {
    let result = "";
    for (let char of text) {
        if (/[a-zA-Z]/.test(char)) {
            let start = char === char.toUpperCase() ? 65 : 97;
            result += String.fromCharCode((char.charCodeAt(0) - start + shift) % 26 + start);
        } else {
            result += char;
        }
    }
    return result;
}

// --- ASCII ---
function asciiEncode(text) {
    return text.split('').map(c => c.charCodeAt(0)).join(' ');
}

// --- KOI8 ---
function koi8Encode(text) {
    try {
        let encoder = new TextEncoder("koi8-r");
        let bytes = encoder.encode(text);
        return Array.from(bytes).join(' ');
    } catch {
        return "Encoding error.";
    }
}

// --- Morse ---
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
    return text.toUpperCase().split('').map(c => morseDict[c] || '').join(' ');
}

// --- Vigenere ---
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

// --- Bacon ---
const baconDict = {
    'A': 'AAAAA','B': 'AAAAB','C': 'AAABA','D': 'AAABB',
    'E': 'AABAA','F': 'AABAB','G': 'AABBA','H': 'AABBB',
    'I': 'ABAAA','J': 'ABAAB','K': 'ABABA','L': 'ABABB',
    'M': 'ABBAA','N': 'ABBAB','O': 'ABBBA','P': 'ABBBB',
    'Q': 'BAAAA','R': 'BAAAB','S': 'BAABA','T': 'BAABB',
    'U': 'BABAA','V': 'BABAB','W': 'BABBA','X': 'BABBB',
    'Y': 'BBAAA','Z': 'BBAAB',' ': '/'
};

function baconEncode(text) {
    return text.toUpperCase().split('').map(c => baconDict[c] || '').join(' ');
}

// --- Atbash ---
function atbashCipher(text) {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const reversed = upper.split('').reverse().join('');
    const lower = upper.toLowerCase();
    const reversedLower = reversed.toLowerCase();

    return text.split('').map(c => {
        if (upper.includes(c)) return reversed[upper.indexOf(c)];
        if (lower.includes(c)) return reversedLower[lower.indexOf(c)];
        return c;
    }).join('');
}

// --- Gronsfeld ---
function gronsfeldCipher(text, key) {
    let result = "";
    let keyIndex = 0;

    for (let char of text) {
        if (char !== ' ') {
            let shift = parseInt(key[keyIndex % key.length]);
            result += String.fromCharCode(char.charCodeAt(0) + shift);
            keyIndex++;
        } else {
            result += char;
        }
    }
    return result;
}

// --- Polybius ---
const polybiusDict = {
    'A': '11','B': '12','C': '13','D': '14','E': '15',
    'F': '21','G': '22','H': '23','I': '24','J': '24',
    'K': '25','L': '31','M': '32','N': '33','O': '34',
    'P': '35','Q': '41','R': '42','S': '43','T': '44',
    'U': '45','V': '51','W': '52','X': '53','Y': '54',
    'Z': '55',' ': '|'
};

function polybiusEncode(text) {
    return text.toUpperCase().split('').map(c => polybiusDict[c] || '').join(' ');
}

// --- Playfair ---
function generateMatrix(key) {
    key = key.toUpperCase().replace(/J/g, 'I');
    let used = new Set();
    let chars = [];

    for (let c of key) {
        if (!used.has(c) && /[A-Z]/.test(c)) {
            used.add(c);
            chars.push(c);
        }
    }

    for (let c of "ABCDEFGHIKLMNOPQRSTUVWXYZ") {
        if (!used.has(c)) chars.push(c);
    }

    let matrix = [];
    for (let i = 0; i < 25; i += 5) {
        matrix.push(chars.slice(i, i + 5));
    }
    return matrix;
}

function findPos(matrix, char) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (matrix[i][j] === char) return [i, j];
        }
    }
}

function prepareText(text) {
    text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    let result = [];

    for (let i = 0; i < text.length; i++) {
        let a = text[i];
        let b = text[i + 1];

        if (!b || a === b) {
            result.push(a + 'X');
        } else {
            result.push(a + b);
            i++;
        }
    }
    return result;
}

function playfairCipher(text, key) {
    let matrix = generateMatrix(key);
    let pairs = prepareText(text);
    let result = "";

    for (let pair of pairs) {
        let [r1, c1] = findPos(matrix, pair[0]);
        let [r2, c2] = findPos(matrix, pair[1]);

        if (r1 === r2) {
            result += matrix[r1][(c1 + 1) % 5];
            result += matrix[r2][(c2 + 1) % 5];
        } else if (c1 === c2) {
            result += matrix[(r1 + 1) % 5][c1];
            result += matrix[(r2 + 1) % 5][c2];
        } else {
            result += matrix[r1][c2];
            result += matrix[r2][c1];
        }
    }
    return result;
}

// --- MAIN ---
function encrypt() {
    let text = document.getElementById("text").value;
    let cipher = document.getElementById("cipher").value;
    let result = "";

    try {
        if (cipher === "caesar") {
            let shift = parseInt(document.getElementById("shift").value);
            result = caesarCipher(text, shift);
        } else if (cipher === "ascii") {
            result = asciiEncode(text);
        } else if (cipher === "koi8") {
            result = koi8Encode(text);
        } else if (cipher === "morse") {
            result = morseEncode(text);
        } else if (cipher === "vigenere") {
            let key = document.getElementById("key").value;
            result = vigenereCipher(text, key);
        } else if (cipher === "bacon") {
            result = baconEncode(text);
        } else if (cipher === "atbash") {
            result = atbashCipher(text);
        } else if (cipher === "gronsfeld") {
            let key = document.getElementById("key").value;
            result = gronsfeldCipher(text, key);
        } else if (cipher === "polybius") {
            result = polybiusEncode(text);
        } else if (cipher === "playfair") {
            let key = document.getElementById("key").value;
            result = playfairCipher(text, key);
        }

        document.getElementById("result").innerText = result;

    } catch (e) {
        document.getElementById("result").innerText = "Error: " + e;
    }
}
