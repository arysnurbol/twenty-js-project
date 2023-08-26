const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');

const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const noticifation = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figuraParts = document.querySelectorAll('.figure-part');
const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];


// Show hidden word
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </span>
        `)}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '').replaceAll(',', '');

    if (innerWord === selectedWord) {
        finalMessage.innerHTML = `Congratulations! You won!`;
        popup.style.display = 'flex';
    }
}

// Update the wrong letters
function updateWrongLettersEl() {
    console.log('update wrong');
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(l => `<span>${l}</span>`)}
    `;

    figuraParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        }else {
            part.style.display = 'none';
        }
    });

    if (wrongLetters.length === figuraParts.length) {
        finalMessage.innerText = 'Unfortunataly you lost';
        popup.style.display = 'flex';
    }
}

// Show notification 
function showNotification() {
    console.log('Notification');
    noticifation.classList.add('show');
    setTimeout(() => {
        noticifation.classList.remove('show');
    }, 2000)
}



// Keydown letter press
window.addEventListener('keydown', e => {
   if (e.keyCode >= 65 && e.keyCode <= 90) {
    const leter = e.key;
    if (selectedWord.includes(leter)) {
        if (!correctLetters.includes(leter)) {
            correctLetters.push(leter);
            displayWord();
        } else {
            showNotification();
        }
    } else {
        if (!wrongLetters.includes(leter)) {
            wrongLetters.push(leter);

            updateWrongLettersEl();
        } else {
            showNotification();
        }
    }
   }
});

// Play again button
function playAgain() {
    // figuraParts.forEach(itm => itm.style.display = 'none');
    wrongLetters.splice(0);
    correctLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none';
}
playAgainBtn.addEventListener('click', playAgain,false);


displayWord();



