// Comprobar si hay usuario logueado en localStorage
const user = localStorage.getItem('reina_username');
if (!user) {
  window.location.href = 'login.html';
} else {
  document.getElementById('mainContent').style.display = 'flex';
}

// Mostrar menú de docente si es la profesora
if (user === "Profesora reina") {
  const menu = document.getElementById("menu-docente");
  if (menu) menu.style.display = "block";

  const menuBtn = document.getElementById("menu-btn");
  const dropdown = document.getElementById("menu-dropdown");

  if (menuBtn && dropdown) {
    menuBtn.addEventListener("click", () => {
      dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }
}

const btnLeft = document.getElementById('btnLeft');
const btnRight = document.getElementById('btnRight');
const illustration = document.getElementById('illustration');
const text = document.getElementById('text');

const slides = [
  {
    src: "imagenes/Happy_Book.png",
    alt: "Ilustración Happy Book",
    text: "¡Vamos a aprender jugando!",
    link: "eco-aventura.html"
  },
  {
    src: "imagenes/karaoke.png",
    alt: "Ilustración Karaoke",
    text: "¡Hora del karaoke!",
    link: "karaoke.html"
  },
  {
    src: "imagenes/cuentos.png",
    alt: "Ilustración Cuentos",
    text: "Escucha y disfruta cuentos",
    link: "cuentos.html"
  },
  {
    src: "imagenes/adivinanzas.png",
    alt: "Ilustración adivinanzas",
    text: "Piensa y adivina ",
    link: "adivinanzas.html"
  },
  {
    src: "imagenes/sonidos.png",
    alt: "Ilustración sonidos",
    text: "Escucha y aprende sonidos",
    link: "sonidos.html"
  },
  {
    src: "imagenes/trabalenguas.png",
    alt: "Ilustración trabalenguas",
    text: "Repite y repite trabalenguas",
    link: "trabalenguas.html"
  }
];

let currentIndex = 0;

function fadeOutIn(element, newContent, isImage = false) {
  element.style.opacity = 0;
  setTimeout(() => {
    if (isImage) {
      element.src = newContent.src;
      element.alt = newContent.alt;
    } else {
      element.textContent = newContent;
    }
    element.style.opacity = 1;
  }, 300);
}

function updateSlide() {
  const slide = slides[currentIndex];

  illustration.classList.remove("illustration");
  void illustration.offsetWidth;
  illustration.classList.add("illustration");

  fadeOutIn(illustration, { src: slide.src, alt: slide.alt }, true);

  text.classList.remove("text");
  void text.offsetWidth;
  text.classList.add("text");

  fadeOutIn(text, slide.text);
}

// Bucle infinito al presionar izquierda o derecha
btnLeft.addEventListener('click', () => {
  btnLeft.classList.add('animate-left');
  setTimeout(() => btnLeft.classList.remove('animate-left'), 400);
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlide();
});

btnRight.addEventListener('click', () => {
  btnRight.classList.add('animate-right');
  setTimeout(() => btnRight.classList.remove('animate-right'), 400);
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide();
});

// Ir al enlace al hacer clic en la ilustración
illustration.style.cursor = 'pointer';
illustration.addEventListener('click', () => {
  const slide = slides[currentIndex];
  if (slide.link) {
    window.location.href = slide.link;
  }
});

// Cerrar sesión
document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('reina_username');
  window.location.href = 'login.html';
});

// Mostrar primer slide al cargar
updateSlide();