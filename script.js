function isEnglishLettersAndSpaces(text) {
    return /^[A-Za-z\s]+$/.test(text);
}

// --- Caesar ---
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

// --- ASCII ---
function asciiEncode(text) {
    return text.split("").map(char => char.charCodeAt(0)).join(" ");
}

// --- KOI8 (для английских символов = ASCII часть) ---
function koi8Encode(text) {
    if (!isEnglishLettersAndSpaces(text)) {
        return "Error: English letters and spaces only.";
    }
    return text.split("").map(char => char.charCodeAt(0)).join(" ");
}

// --- Morse ---
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

// --- Vigenere ---
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

// --- Bacon ---
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

// --- Atbash ---
function atbashCipher(text) {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const reversedUpper = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const reversedLower = "zyxwvutsrqponmlkjihgfedcba";

    return text.split("").map(char => {
        if (upper.includes(char)) return reversedUpper[upper.indexOf(char)];
        if (lower.includes(char)) return reversedLower[lower.indexOf(char)];
        return char;
    }).join("");
}

// --- Gronsfeld ---
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

// --- Polybius ---
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

// --- Playfair ---
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
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            if (matrix[r][c] === char) return [r, c];
        }
    }
}

function preparePlayfairText(text) {
    const clean = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
    const pairs = [];
    let i = 0;

    while (i < clean.length) {
        const a = clean[i];
        const b = clean[i + 1];

        if (!b || a === b) {
            pairs.push(a + "X");
            i++;
        } else {
            pairs.push(a + b);
            i += 2;
        }
    }

    return pairs;
}

function playfairCipher(text, key) {
    const matrix = generatePlayfairMatrix(key);
    const pairs = preparePlayfairText(text);
    let result = "";

    for (const pair of pairs) {
        const [r1, c1] = findPosition(matrix, pair[0]);
        const [r2, c2] = findPosition(matrix, pair[1]);

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

// --- UI ---
function updateFields() {
    const cipher = document.getElementById("cipher").value;
    const shiftGroup = document.getElementById("shift-group");
    const keyGroup = document.getElementById("key-group");

    shiftGroup.classList.add("hidden");
    keyGroup.classList.add("hidden");

    if (cipher === "caesar") shiftGroup.classList.remove("hidden");
    if (["vigenere", "gronsfeld", "playfair"].includes(cipher)) {
        keyGroup.classList.remove("hidden");
    }
}

function encrypt() {
    const cipher = document.getElementById("cipher").value;
    const text = document.getElementById("text").value;
    const shift = document.getElementById("shift").value;
    const key = document.getElementById("key").value;
    const result = document.getElementById("result");

    if (!text) {
        result.innerText = "Error: enter text.";
        return;
    }

    if (cipher === "caesar") {
        result.innerText = caesarCipher(text, parseInt(shift) || 0);
    } else if (cipher === "ascii") {
        result.innerText = asciiEncode(text);
    } else if (cipher === "koi8") {
        result.innerText = koi8Encode(text);
    } else if (cipher === "morse") {
        result.innerText = morseEncode(text);
    } else if (cipher === "vigenere") {
        result.innerText = vigenereCipher(text, key);
    } else if (cipher === "bacon") {
        result.innerText = baconEncode(text);
    } else if (cipher === "atbash") {
        result.innerText = atbashCipher(text);
    } else if (cipher === "gronsfeld") {
        result.innerText = gronsfeldCipher(text, key);
    } else if (cipher === "polybius") {
        result.innerText = polybiusEncode(text);
    } else if (cipher === "playfair") {
        result.innerText = playfairCipher(text, key);
    }
}

document.getElementById("cipher").addEventListener("change", updateFields);
document.getElementById("encrypt-btn").addEventListener("click", encrypt);

updateFields();
