document.addEventListener('DOMContentLoaded', () => {
  
const allLetters = [
  // Etapa 1
  'A', 'E', 'I', 'O', 'U',
  // Etapa 2
  'M', 'P', 'L', 'S', 'T',
  // Etapa 3
  'N', 'D', 'F',
  // Etapa 4
  'G', 'C', 'B', 'V', 'R',
  // Etapa 5
  'J', 'H', 'Q', 'Ñ', 'Y', 'Z', 'X', 'RR', 'CH'
];


  const letterImage = document.getElementById('letterImage');
  const btnLeft = document.getElementById('btnLeft');
  const btnRight = document.getElementById('btnRight');

  let currentIndex = 0;

  function displayLetter() {
    const currentLetter = allLetters[currentIndex];

    letterImage.style.opacity = 0;
    setTimeout(() => {
      letterImage.src = `imagenes/Letras/Letra${currentLetter}.png`;
      letterImage.alt = `Letra ${currentLetter}`;
      letterImage.setAttribute('data-letter', currentLetter);
      letterImage.style.opacity = 1;
    }, 150);
  }

  btnLeft.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + allLetters.length) % allLetters.length;
    displayLetter();
  });

  btnRight.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % allLetters.length;
    displayLetter();
  });

  letterImage.addEventListener('click', () => {
    const letter = letterImage.getAttribute('data-letter');
    if (letter) {
      window.location.href = `vocabulario.html?letra=${letter}`;
    }
  });

  letterImage.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      letterImage.click();
    }
  });

  displayLetter();
});
