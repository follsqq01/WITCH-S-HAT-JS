let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0; 
const totalPairs = Math.floor(document.querySelectorAll('.card').length / 2); 
const container = document.querySelector('.card-container');

function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add('flipped');
    if (!firstCard) {
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    firstCard.dataset.id === secondCard.dataset.id ? disableCards() : unflipCards();
}

//  Оставляем открытыми замэтченные карты
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    onPairFound();
    if (++matchedPairs === totalPairs) endGame();
}

// Закрываем не совпавшие карточки
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Сброс 
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Перемешиваем
function shuffleCards() {
    const cards = document.querySelectorAll('.card');
    const shuffledCards = Array.from(cards).sort(() => Math.random() - 0.5);
    container.innerHTML = '';
    shuffledCards.forEach(card => container.appendChild(card));
    updateContainerHeight();
}

// 
function updateContainerHeight() {
    const rows = Math.ceil(container.children.length / Math.floor(container.offsetWidth / 120));
    container.style.height = `${rows * 170}px`;
}

// запууск!!
function restartGame() {
    matchedPairs = 0;
    timeRemaining = 60;
    timerElement.textContent = '01:00';
    startTimer();
    shuffleCards();
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped');
        card.addEventListener('click', flipCard);
    });
}

// Запуск конфетти при мэтче
function onPairFound() {
    console.log("Пара найдена!");
    [0, 100, 200].forEach(delay => setTimeout(shoot, delay));
}

const defaults = { spread: 360, ticks: 50, gravity: 0, decay: 0.94, startVelocity: 30, colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'] };
function shoot() {
    confetti({ ...defaults, particleCount: 40, scalar: 1.2, shapes: ['star'] });
    confetti({ ...defaults, particleCount: 10, scalar: 0.75, shapes: ['circle'] });
}

// Таймер
let timeRemaining = 60;
const timerElement = document.getElementById('timer');
let timerInterval;
function startTimer() {
    timerInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert('Время вышло! Попробуйте снова.');
            restartGame();
        } else {
            timeRemaining--;
            timerElement.textContent = `${String(Math.floor(timeRemaining / 60)).padStart(2, '0')}:${String(timeRemaining % 60).padStart(2, '0')}`;
        }
    }, 1000);
}

// Окончание игры и окошко
function endGame() {
    clearInterval(timerInterval);
    setTimeout(() => {
        alert('Поздравляем! Вы нашли все пары!');
        restartGame();
    }, 500);
}

const observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
        startTimer();
        observer.disconnect();
    }
}, { threshold: 0.5 });
observer.observe(container);

const gameSection = document.getElementById("cards_game");
const visibilityObserver = new MutationObserver(() => {
    if (getComputedStyle(gameSection).display === "none") clearInterval(timerInterval);
});
visibilityObserver.observe(document.body, { attributes: true, childList: true, subtree: true });

window.addEventListener("DOMContentLoaded", () => {
    shuffleCards();
    document.querySelectorAll('.card').forEach(card => card.addEventListener('click', flipCard));
});
