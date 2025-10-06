document.addEventListener('DOMContentLoaded', () => {
  const allLetters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
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
