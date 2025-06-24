document.addEventListener('DOMContentLoaded', () => {
  const lettersGroups = [
    ['A', 'B', 'C'],
    ['D', 'E', 'F'],
    ['G', 'H', 'I'],
    ['J', 'K', 'L'],
    ['M', 'N', 'Ñ', 'O'],
    ['P', 'Q', 'R'],
    ['S', 'T', 'U'],
    ['V', 'W', 'X'],
    ['Y', 'Z']
  ];

  const imgElements = [
    document.getElementById('letterA'),
    document.getElementById('letterB'),
    document.getElementById('letterC')
  ];

  const btnLeft = document.getElementById('btnLeft');
  const btnRight = document.getElementById('btnRight');

  let currentIndex = 0;

  function displayLetters() {
    const currentLetters = lettersGroups[currentIndex];

    // Reiniciar imágenes para animar
    imgElements.forEach(img => {
      img.classList.remove('active');
      img.style.animation = 'none';
      img.style.opacity = 0;
      img.src = '';
      img.alt = '';
      img.style.display = 'none';
    });

    setTimeout(() => {
      currentLetters.forEach((letter, i) => {
        if (imgElements[i]) {
          const img = imgElements[i];
          img.src = `imagenes/Letras/Letra${letter}.png`;
          img.alt = `Letra ${letter}`;
          img.setAttribute('data-letter', letter);
          img.style.display = 'block';
          img.style.opacity = 1;
          img.classList.add('active');
          // Opcional: ajustar posición si quieres (igual que antes)
        }
      });
    }, 10);

    btnLeft.disabled = currentIndex === 0;
    btnRight.disabled = currentIndex === lettersGroups.length - 1;
  }

  btnLeft.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      displayLetters();
    }
  });

  btnRight.addEventListener('click', () => {
    if (currentIndex < lettersGroups.length - 1) {
      currentIndex++;
      displayLetters();
    }
  });

  // Click y teclado para redirección con letra actual
  imgElements.forEach(el => {
    el.addEventListener('click', () => {
      const letter = el.getAttribute('data-letter');
      if (letter) {
        window.location.href = `vocabulario.html?letra=${letter}`;
      }
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });

  displayLetters();
});
