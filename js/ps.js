document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("game-container");
    const hat = document.getElementById("blue_hat");
    const scoreDisplay = document.getElementById("score1");

    let hatPosition = gameContainer.offsetWidth / 2 - hat.offsetWidth / 2;
    let score = 0;

    hat.style.transform = "none";
    hat.style.left = hatPosition + "px";

    function moveHat(event) {
        const step = 30;
        const minLeft = 0;
        const maxRight = gameContainer.offsetWidth - hat.offsetWidth;

        if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
            hatPosition = Math.max(minLeft, hatPosition - step);
        } else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
            hatPosition = Math.min(maxRight, hatPosition + step);
        }
        hat.style.left = hatPosition + "px";
    }

    document.addEventListener("keydown", moveHat);

    function createStar() {
        if (score >= 18) return; // Проверяем, не достиг ли счёт 18

        const star = document.createElement("img");
        star.classList.add("star");
        
        star.src = "img/vector.svg";
        star.style.left = Math.random() * (gameContainer.offsetWidth - 30) + "px";
        star.style.top = "0px";
        gameContainer.appendChild(star);

        const fallInterval = setInterval(() => {
            let starTop = parseFloat(star.style.top);
            let starLeft = parseFloat(star.style.left);
            let starWidth = star.offsetWidth;
            let starHeight = star.offsetHeight;

            let hatLeft = parseFloat(hat.style.left);
            let hatTop = hat.offsetTop;
            let hatWidth = hat.offsetWidth;
            let hatHeight = hat.offsetHeight;

            const padding = 15;

            if (
                starTop + starHeight >= hatTop + padding &&
                starLeft + starWidth > hatLeft &&
                starLeft < hatLeft + hatWidth
            ) {
                clearInterval(fallInterval);
                star.remove();
                score++;
                scoreDisplay.textContent = `${score}/18`;

                if (score >= 18) {
                    alert("Ты победил!");
                    clearInterval(gameInterval);
                    document.removeEventListener("keydown", moveHat);
                    return;
                }
            }

            if (starTop < gameContainer.offsetHeight - starHeight) {
                star.style.top = starTop + 10 + "px";
            } else {
                clearInterval(fallInterval);
                star.remove();
            }
        }, 50);
    }

    const gameInterval = setInterval(createStar, 1500);
});

//молнии
document.addEventListener("DOMContentLoaded", () => {
    const headphones = document.querySelector(".headphones");
    const charger = document.querySelector(".charger");
    const notes = document.querySelectorAll(".note1, .note2, .note3");
    const lightning = document.querySelectorAll(".lightning, .lightning1");

    // Функция для сброса состояния нот и начала их анимации
    function resetNotes() {
        notes.forEach(note => {
            note.style.opacity = "0"; // Скрываем ноты
            note.classList.remove("float"); // Удаляем класс анимации
        });
    }

    // ноты с анимацией
    function showNotes() {
        resetNotes(); 

        notes.forEach((note, index) => {
            setTimeout(() => {
                note.style.opacity = "1"; 
                note.classList.add("float"); 
            }, index * 1000); 
        });
    }

    // анимация молний
    function animateLightning() {
        lightning.forEach(l => {
            l.style.opacity = "1"; 
            l.classList.add("shake"); 
        });

        setTimeout(() => {
            lightning.forEach(l => {
                l.style.opacity = "0"; 
                l.classList.remove("shake"); 
            });
        }, 1000); 
    }

    // кна наушники
    headphones.addEventListener("click", showNotes);

    // клик на зарядку
    charger.addEventListener("click", animateLightning);
});



document.addEventListener("DOMContentLoaded", () => {
    const hat = document.getElementById("blue_hat");
    const container = document.getElementById("game-container");

    let hatX = 0; 
    let speed = 10; 
    let isMouseControl = true; 

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    // Управление мышью
    container.addEventListener("mousemove", (event) => {
        const rect = container.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        hatX = clamp(mouseX - hat.clientWidth / 2, 0, rect.width - hat.clientWidth);
        hat.style.left = hatX + "px";
        isMouseControl = true;
    });

    document.addEventListener("keydown", (event) => {
        if (["a", "ф", "d", "в"].includes(event.key.toLowerCase())) {
            isMouseControl = false; 
            let speed = 20; 

            if (event.key.toLowerCase() === "a" || event.key.toLowerCase() === "ф") {
                hatX = clamp(hatX - speed, 0, container.clientWidth - hat.clientWidth);
            } else if (event.key.toLowerCase() === "d" || event.key.toLowerCase() === "в") {
                hatX = clamp(hatX + speed, 0, container.clientWidth - hat.clientWidth);
            }

            hat.style.left = hatX + "px";
        }
    });
});
//меняем цвет
document.addEventListener("DOMContentLoaded", function() {
    const colorButton = document.querySelector(".color_button_ps"); 
    const hat = document.getElementById("blue_hat"); 

    const hatImages = [
        "img/blue_cap.svg",   
        "img/green_cap.svg", 
        "img/pink_cap.svg",    
    ];

    let currentHatIndex = 0; 
    colorButton.addEventListener("click", function() {
        currentHatIndex = (currentHatIndex + 1) % hatImages.length;
        hat.src = hatImages[currentHatIndex];
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const arrowLeft = document.querySelector(".arrow1_ps");
    const arrowRight = document.querySelector(".arrow3_ps");
    let movingInterval;

    function simulateKeyPress(key) {
        const event = new KeyboardEvent("keydown", { key: key });
        document.dispatchEvent(event);
    }

    function startMoving(key) {
        simulateKeyPress(key);
        movingInterval = setInterval(() => simulateKeyPress(key), 55); 
    }

    function stopMoving() {
        clearInterval(movingInterval);
    }

    arrowLeft.addEventListener("mousedown", () => startMoving("a"));
    arrowLeft.addEventListener("mouseup", stopMoving);
    arrowLeft.addEventListener("mouseleave", stopMoving);

    arrowRight.addEventListener("mousedown", () => startMoving("d"));
    arrowRight.addEventListener("mouseup", stopMoving);
    arrowRight.addEventListener("mouseleave", stopMoving);
});
document.addEventListener("DOMContentLoaded", () => {
    const helpButton = document.querySelector(".help__button_ps");
    const helpImage = document.getElementById("helpImage");

    helpButton.addEventListener("click", () => {
        helpImage.classList.toggle("show");
    });
});