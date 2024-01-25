// DOM elemanları
const inputs = document.querySelector(".inputs"), // Kullanıcının tahminlerini gösteren alan
    hintTag = document.querySelector(".hint span"), // İpucu etiketi
    guessLeft = document.querySelector(".guess-left span"), // Kalan tahmin sayısı
    wrongLetter = document.querySelector(".wrong-letter span"), // Yanlış harfler
    resetBtn = document.querySelector(".reset-btn"), // Oyunu sıfırlama butonu
    typingInput = document.querySelector(".typing-input"); // Kullanıcının harf girmesi için giriş alanı

// Kelime listesi (wordList değişkeninin başka bir yerde tanımlandığını varsayalım)
let word, maxGuesses, incorrectLetters = [], correctLetters = [];

// Oyunu başlatmak için rastgele bir kelime seçen fonksiyon
function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word; // Seçilen kelime
    maxGuesses = word.length >= 5 ? 8 : 6; // Maksimum tahmin sayısı
    correctLetters = [];
    incorrectLetters = [];
    hintTag.innerText = ranItem.hint; // İpucu
    guessLeft.innerText = maxGuesses; // Kalan tahmin sayısı
    wrongLetter.innerText = incorrectLetters;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}

// İlk rastgele kelime seçimi
randomWord();

// Kullanıcı girişi üzerinde oyun mantığını işleyen fonksiyon
function initGame(e) {
    let key = e.target.value.toLowerCase();
    if (key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    typingInput.value = "";

    setTimeout(() => {
        if (correctLetters.length === word.length) {
            alert(`Tebrikler! Kelimeyi buldunuz: ${word.toUpperCase()}`);
            return randomWord();
        } else if (maxGuesses < 1) {
            alert("Oyun bitti! Kullanılabilir tahmin hakkınız kalmadı.");
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

// Olay dinleyicileri
resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);

// Kullanıcı inputs alanına tıkladığında giriş alanına odaklanan olay dinleyicisi
inputs.addEventListener("click", () => typingInput.focus());

// Herhangi bir tuşa basıldığında giriş alanına odaklanan olay dinleyicisi
document.addEventListener("keydown", () => typingInput.focus());
