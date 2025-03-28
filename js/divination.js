let attractInterval;
let gachaTimeout;
let isZoomed = false;
let isGachaRunning = false;

const box = document.querySelector(".box");
const table = document.querySelector(".table");
const divination = document.querySelector(".DIVINATION");
const curtains = document.querySelector(".curtains");
const curtains2 = document.querySelector(".curtains2");
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
    startGachaAnimation();
  }
}

function moveCameraTo(target) {
  let rect = target.getBoundingClientRect();
  let sceneRect = divination.getBoundingClientRect();

  let centerX = sceneRect.width / 2 - rect.left - rect.width / 2;
  let centerY = sceneRect.height / 2 - rect.top - rect.height / 2;

  divination.style.transition = "transform 0.8s ease-in-out";
  divination.style.transform = `translate(${centerX}px, ${centerY}px) scale(1.4)`;

  if (curtains) {
    curtains.style.opacity = "0";
    curtains.style.transform = "scale(1.2)";
  }

  if (curtains2) {
    curtains2.style.opacity = "0";
    curtains2.style.transform = "scale(1.2)";
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

function startAttractingEffect() {
  if (isGachaRunning) return;

  stopAttractingEffect();
  attractInterval = setInterval(() => {
    if (!box) return;
    box.style.transition = "transform 0.3s ease-in-out";
    box.style.transform = "translateY(-10%)";
    setTimeout(() => (box.style.transform = "translateY(0)"), 300);
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

function startGachaAnimation() {
  stopAttractingEffect();
  let jumpCount = 0;
  let jumpDelay = 200;

  function jump() {
    if (jumpCount < 12) {
      box.style.transition = "transform 0.1s ease-in-out";
      box.style.transform = `translateY(${jumpCount % 2 === 0 ? -15 : 0}%)`;
      jumpCount++;
      jumpDelay = Math.max(50, jumpDelay - 15);
      gachaTimeout = setTimeout(jump, jumpDelay);
    } else {
      startShaking();
    }
  }
  jump();
}

function startShaking() {
  let shakeCount = 0;
  function shake() {
    if (shakeCount < 30) {
      box.style.transition = "transform 0.05s ease-in-out";
      box.style.transform = `translate(${shakeCount % 2 === 0 ? -5 : 3}%, 0)`;
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
  card.style.marginTop = "-5%";

  setTimeout(() => {
    alert(
      "Дорогой друг, Карты сложились удачно, звёзды шепчут твое имя, а ветер перемен несёт тебя в одно особенное место…🔮✨. Ателье магических колпаков ждёт тебя! Здесь твоя судьба обретёт новый облик, а твой идеальный колпак — уже готов раскрыть свой секрет. Сделай шаг навстречу чуду!"
    );
  }, 1500);
}
