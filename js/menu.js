//текст цветноЙ!!!
document.addEventListener("DOMContentLoaded", () => {
  const text =
    "ATELIER OF MAGIC CAPS - A SAFE PLACE FOR RELAXATION AND ENTERTAINMENT.";
  const container = document.getElementById("menu_text");

  text.split("").forEach((letter) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.classList.add("letter");

    span.addEventListener("mouseenter", () => {
      span.style.color = getRandomColor();
      span.style.opacity = "1";
      if (span.timeoutId) clearTimeout(span.timeoutId);
    });
    container.appendChild(span);
  });
});

function getRandomColor() {
  const colors = ["#F28482", "#F8C4BB", "#84A59D", "#F6BE61"];
  return colors[Math.floor(Math.random() * colors.length)];
}

//  Анимация звёзд и колпака
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(
    ".star_yellow1, .star_yellow2, .star_yellow3"
  );
  const cap = document.querySelector(".cap_menu");

  function toggleAnimations(state) {
    stars.forEach((star) => (star.style.animationPlayState = state));
    cap.style.animationPlayState = state;
  }

  [...stars, cap].forEach((el) => {
    el.addEventListener("mouseenter", () => toggleAnimations("running"));
    el.addEventListener("mouseleave", () => toggleAnimations("paused"));
  });
});

// Анимация карт
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".card_front_menu, .card_back_menu, .star_card_menu"
  );
  function toggleAnimations(state) {
    elements.forEach((el) => (el.style.animationPlayState = state));
  }
  elements.forEach((el) => {
    el.addEventListener("mouseenter", () => toggleAnimations("running"));
    el.addEventListener("mouseleave", () => toggleAnimations("paused"));
  });
});

//  Глаз
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".eye_menu, .moon_menu, .hand_menu"
  );
  function toggleAnimations(state) {
    elements.forEach((el) => (el.style.animationPlayState = state));
  }
  elements.forEach((el) => {
    el.addEventListener("mouseenter", () => toggleAnimations("running"));
    el.addEventListener("mouseleave", () => toggleAnimations("paused"));
  });
});

//Переключение секций
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("section").forEach((section) => {
    if (!section.classList.contains("menu_screen"))
      section.style.display = "none";
  });

  document.querySelectorAll(".menu-item button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = button
        .querySelector("a")
        .getAttribute("href")
        .substring(1);
      document
        .querySelectorAll("section")
        .forEach((section) => (section.style.display = "none"));
      document.getElementById(targetId).style.display = "flex";
    });
  });
});

// запуск джиески только при переключении на секцию
function observeSection(section) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section
            .querySelectorAll("script")
            .forEach((script) => eval(script.textContent));
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(section);
}

document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("music");

  function playMusic() {
    if (music) {
      music.volume = 0.5;
      music
        .play()
        .then(() => console.log("Музыка запущена"))
        .catch((error) =>
          console.log("Автовоспроизведение заблокировано:", error)
        );
    }
  }

  // Включение музыки по клику, чтобы пользователь не испугался, как только зашел на сайт
  document.addEventListener("click", playMusic, { once: true });
});

document.addEventListener("DOMContentLoaded", () => {
  const clickSound = document.getElementById("clickSound");
  clickSound.volume = 0.3;
});
document.body.style.overflowX = "hidden";
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(
    ".bottom_ps, .bottom1, .bottom2, .bottom4, .bottom5"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const menuScreen = document.querySelector(".menu_screen");
      const currentSection = button.closest("section");

      if (menuScreen && currentSection) {
        currentSection.style.display = "none";
        menuScreen.scrollIntoView({ behavior: "smooth" });
        menuScreen.style.display = "flex";
      }
    });
  });
});
