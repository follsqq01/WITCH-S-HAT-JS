const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = "#000000"; // Цвет линии по умолчанию - черный (концепт)

function resizeCanvas() {
  const container = document.querySelector(".canvas-container");
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function getCanvasCoordinates(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

// События для рисования
canvas.addEventListener("mousedown", (event) => {
  drawing = true;
  const { x, y } = getCanvasCoordinates(event);
  lastX = x;
  lastY = y;
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener("mousemove", (event) => {
  if (!drawing) return;
  const { x, y } = getCanvasCoordinates(event);
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
});

function resizeCanvas() {
  canvas.width = 1356;
  canvas.height = 811; //размеры холста (зоны, на которой можно рисовать)
}

// Перетаскивание объектов
const draggableItems = document.querySelectorAll(".draggable");

let activeElement = null;
let startX = 0;
let startY = 0;
let offsetX = 0;
let offsetY = 0;

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("dragstart", (event) => event.preventDefault());
});

// Начало перетаскивания
draggableItems.forEach((item) => {
  item.addEventListener("mousedown", (e) => {
    e.preventDefault();
    activeElement = e.target;

    if (!activeElement.parentElement.style.position) {
      activeElement.parentElement.style.position = "relative";
    }

    const rect = activeElement.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    offsetX = startX - rect.left;
    offsetY = startY - rect.top;

    activeElement.style.position = "absolute";
    activeElement.style.zIndex = "1000";
    activeElement.style.cursor = "grabbing";

    document.body.style.userSelect = "none";
  });
});

// Перетаскивание предметов
document.addEventListener("mousemove", (e) => {
  if (!activeElement) return;

  const parentRect = activeElement.parentElement.getBoundingClientRect();
  const newX = e.clientX - parentRect.left - offsetX;
  const newY = e.clientY - parentRect.top - offsetY;

  activeElement.style.left = `${newX}px`;
  activeElement.style.top = `${newY}px`;
});

// Завершение перетаскивания
document.addEventListener("mouseup", () => {
  if (activeElement) {
    activeElement.style.cursor = "grab";
    activeElement = null;
    document.body.style.userSelect = "";
  }
});

// Розовая кнопка
const colorButton = document.getElementById("colorButton");
colorButton.addEventListener("mousedown", () => {
  currentColor = "#E18989";
});
colorButton.addEventListener("mousedown", () => {
  colorButton.style.transform = "scale(1.1)";
});
colorButton.addEventListener("mouseup", () => {
  colorButton.style.transform = "scale(1)";
});

// Желтая кнопка
const colorButton1 = document.getElementById("colorButton1");
colorButton1.addEventListener("mousedown", () => {
  currentColor = "#F6BE61";
});
colorButton1.addEventListener("mousedown", () => {
  colorButton1.style.transform = "scale(1.1)";
});
colorButton1.addEventListener("mouseup", () => {
  colorButton1.style.transform = "scale(1)";
});
// Бирюзовая? кнопка
const colorButton2 = document.getElementById("colorButton2");
colorButton2.addEventListener("mousedown", () => {
  currentColor = "#77ACA9";
});
colorButton2.addEventListener("mousedown", () => {
  colorButton2.style.transform = "scale(1.1)";
});
colorButton2.addEventListener("mouseup", () => {
  colorButton2.style.transform = "scale(1)";
});
// Зеленвя кнопка
const colorButton3 = document.getElementById("colorButton3");
colorButton3.addEventListener("mousedown", () => {
  currentColor = "#A3A54F";
});
colorButton3.addEventListener("mousedown", () => {
  colorButton3.style.transform = "scale(1.1)";
});
colorButton3.addEventListener("mouseup", () => {
  colorButton3.style.transform = "scale(1)";
});

// Очистки холста
function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
}
function getTouchCoordinates(event) {
  const touch = event.touches[0];
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (touch.clientX - rect.left) * scaleX,
    y: (touch.clientY - rect.top) * scaleY,
  };
}

// Поддержка сенсорных устройств
canvas.addEventListener("touchstart", (event) => {
  event.preventDefault();
  drawing = true;
  const { x, y } = getTouchCoordinates(event);
  lastX = x;
  lastY = y;
});

canvas.addEventListener("touchmove", (event) => {
  event.preventDefault();
  if (!drawing) return;
  const { x, y } = getTouchCoordinates(event);
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
});

canvas.addEventListener("touchend", () => {
  drawing = false;
  ctx.beginPath();
});

document.addEventListener("DOMContentLoaded", () => {
  const rotateScreen = document.querySelector(".rotate_screen");

  function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
      rotateScreen.style.display = "flex";
    } else {
      rotateScreen.style.display = "none";
    }
  }

  checkOrientation();

  window.addEventListener("orientationchange", checkOrientation);
  window.addEventListener("resize", checkOrientation);
});

document.addEventListener("DOMContentLoaded", () => {
  const rotateScreen = document.querySelector(".rotate_screen");

  function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
      rotateScreen.style.display = "flex";
    } else {
      rotateScreen.style.display = "none";
    }
  }

  checkOrientation(); // Это должно проверять ориентацию при загрузке

  window.addEventListener("orientationchange", checkOrientation);
  window.addEventListener("resize", checkOrientation);
});
