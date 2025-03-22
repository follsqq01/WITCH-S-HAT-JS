let attractInterval;
let gachaTimeout;
let isZoomed = false;
let isGachaRunning = false;

const box = document.querySelector(".box");
const table = document.querySelector(".table");
const divination = document.querySelector(".DIVINATION");
const curtains = document.querySelector(".curtains");
const card = document.querySelector(".card1");

if (!box || !table || !divination) {
    console.error("Ошибка: не найдены элементы .box, .table или .DIVINATION!");
} else {
    document.addEventListener("click", handleClick);
}

function handleClick(event) {
    if (event.target === box) {
        handleBoxClick();
    } else if (event.target === table) {
        resetCamera();
        resetBox();
    }
}

function handleBoxClick() {
    if (!isZoomed) {
        moveCameraTo(box);
        isZoomed = true;
        setTimeout(startAttractingEffect, 1000);
    } else if (!isGachaRunning) {
        isGachaRunning = true;
        stopAttractingEffect();
        // Останавливаем подпрыгивание перед гача-анимацией!!
        startGachaAnimation();
    }
}

function moveCameraTo(target) {
    let rect = target.getBoundingClientRect();
    let sceneRect = divination.getBoundingClientRect();

    let centerX = sceneRect.width / 2 - rect.left - rect.width / 2;
    let centerY = sceneRect.height / 2 - rect.top - rect.height / 2;

    divination.style.transition = "transform 0.8s ease-in-out";
    divination.style.transform = `translate(${centerX}px, ${centerY}px) scale(1.5)`;

    if (curtains) {
        curtains.style.opacity = "0";
        curtains.style.transform = "scale(1.2)";
    }
}

function resetCamera() {
    divination.style.transition = "transform 0.8s ease-in-out";
    divination.style.transform = "translate(0, 0) scale(1)";

    if (curtains) {
        curtains.style.opacity = "1";
        curtains.style.transform = "scale(1)";
    }
}
// Функция редкого подпрыгивания коробки (намек пользователю!)
function startAttractingEffect() {
    if (isGachaRunning) return;

    stopAttractingEffect();
    attractInterval = setInterval(() => {
        if (!box) return;
        box.style.transition = "transform 0.3s ease-in-out";
        box.style.transform = "translateY(-15px)";
        setTimeout(() => box.style.transform = "translateY(0)", 300);
    }, 4000);
}

function stopAttractingEffect() {
    clearInterval(attractInterval);
    attractInterval = null;
}

function resetBox() {
    clearTimeout(gachaTimeout);
    stopAttractingEffect();
    box.style.transition = "transform 0.3s ease-in-out";
    box.style.transform = "translateY(0)";
    isZoomed = false;
    isGachaRunning = false;
    setTimeout(startAttractingEffect, 2000);
}
// гача-анимации (коробка)
function startGachaAnimation() {
    stopAttractingEffect();
    let jumpCount = 0;
    let jumpDelay = 200;

    function jump() {
        if (jumpCount < 12) {
            box.style.transition = "transform 0.1s ease-in-out";
            box.style.transform = `translateY(${jumpCount % 2 === 0 ? -15 : 0}px)`;
            jumpCount++;
            jumpDelay = Math.max(50, jumpDelay - 15);
            gachaTimeout = setTimeout(jump, jumpDelay);
        } else {
            startShaking();
        }
    }
    jump();
}
// тряска коробки
function startShaking() {
    let shakeCount = 0;
    function shake() {
        if (shakeCount < 30) {
            box.style.transition = "transform 0.05s ease-in-out";
            box.style.transform = `translate(${shakeCount % 2 === 0 ? -5 : 5}px, 0)`;
            shakeCount++;
            setTimeout(shake, 50);
        } else {
            stopBox();
            setTimeout(showCard, 1000);
        }
    }
    shake();
}

function stopBox() {
    setTimeout(() => {
        box.style.transition = "transform 0.2s ease-in-out";
        box.style.transform = "translate(0, 0)";
        isGachaRunning = false;
    });
}

function showCard() {
    if (!card) return;
    card.style.transition = "margin-top 0.5s ease-in-out";
    card.style.marginTop = "10%";

    setTimeout(() => {
        alert("Поздравляем! Карта «Башня» Таро в нашем ателье символизирует освобождение и обновление. Она напоминает, что для создания нового иногда нужно разрушить старое. Этот момент трансформации — шанс для нового начала, когда магические колпаки становятся не только защитой, но и инструментами для создания уникальных миров");
    }, 1500);
}
