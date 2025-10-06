document.addEventListener('DOMContentLoaded', () => {
  // 1. Aplanamos el arreglo: ahora es una lista simple de todas las letras.
  const allLetters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  // 2. Seleccionamos el único elemento de imagen que dejamos en el HTML.
  const letterImage = document.getElementById('letterImage');
  
  const btnLeft = document.getElementById('btnLeft');
  const btnRight = document.getElementById('btnRight');

  let currentIndex = 0; // Este índice ahora apunta a una letra individual.

  // 3. La función ahora se encarga de mostrar una sola letra.
  function displayLetter() {
    const currentLetter = allLetters[currentIndex];

    // Agregamos una pequeña transición para que el cambio sea más suave
    letterImage.style.opacity = 0;
    
    setTimeout(() => {
      letterImage.src = `imagenes/Letras/Letra${currentLetter}.png`;
      letterImage.alt = `Letra ${currentLetter}`;
      letterImage.setAttribute('data-letter', currentLetter);
      letterImage.style.opacity = 1;
    }, 150); // 150ms para que la transición se note

    // 4. Actualizamos el estado de los botones.
    btnLeft.disabled = currentIndex === 0;
    btnRight.disabled = currentIndex === allLetters.length - 1;
  }

  btnLeft.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      displayLetter();
    }
  });

  btnRight.addEventListener('click', () => {
    if (currentIndex < allLetters.length - 1) {
      currentIndex++;
      displayLetter();
    }
  });

  // 5. El evento de clic y teclado ahora se aplica a la única imagen.
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

  // Carga la primera letra al iniciar la página.
  displayLetter();
});
