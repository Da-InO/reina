document.addEventListener("DOMContentLoaded", () => {
    // ELEMENTOS DEL DOM
    const karaokeVideo = document.getElementById("karaoke-video");
    const karaokeContent = document.getElementById("karaoke-content");
    const karaokePhrase = document.getElementById("karaoke-phrase");
    const karaokeFeedback = document.getElementById("karaoke-feedback");
    const retryButton = document.getElementById("retry-button");

    // CORRECTO: Apuntamos al contenedor del video de inicio
    const startKaraokeContainer = document.getElementById("karaoke-container");

    // ... (El resto del código como 'pausePoints' y 'recognition' no cambia) ...
    const pausePoints = [
        {
            time: 27,
            phrases: ["Rolo ratón", "Rolo ratón", "pasa el rato en un rincon", "come rosquillas", "sobre una silla", "con Roberto y con Ramón"]
        },
        {
            time: 63,
            phrases: ["Rolo ratón", "Rolo ratón", "pasa el rato en un rincon", "come rosquillas", "sobre una silla", "con Roberto y con Ramón"]
        }
    ];

    let currentPauseIndex = 0;
    let currentPhraseIndex = 0;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        karaokeFeedback.textContent = "Tu navegador no soporta el reconocimiento de voz.";
        if(startKaraokeContainer) startKaraokeContainer.style.display = "none";
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = true;
    recognition.interimResults = false;
    
    // CORRECTO: El evento de clic ahora está en el contenedor del video
    startKaraokeContainer.addEventListener("click", () => {
        startKaraokeContainer.style.display = "none"; // Ocultamos el contenedor entero
        karaokeVideo.style.display = "block";
        karaokeContent.style.display = "block";
        karaokeVideo.muted = false;
        karaokeVideo.play();
        karaokeFeedback.textContent = "¡Canta cuando el video se detenga!";
    });
    
    // --- AQUÍ VA EL RESTO DEL CÓDIGO JS SIN CAMBIOS ---
    // (timeupdate, onresult, onerror, etc.)
    const normalizeText = (text) => {
        return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    };

    const displayPhrases = (phrases) => {
        karaokePhrase.innerHTML = phrases.map((phrase, index) => `<span class="karaoke-phrase" data-index="${index}">${phrase}</span>`).join(" ");
    };

    karaokeVideo.addEventListener("timeupdate", () => {
        if (currentPauseIndex >= pausePoints.length) return;
        const pausePoint = pausePoints[currentPauseIndex];
        if (Math.abs(karaokeVideo.currentTime - pausePoint.time) < 0.5 && !karaokeVideo.paused) {
            karaokeVideo.pause();
            currentPhraseIndex = 0;
            displayPhrases(pausePoint.phrases);
            karaokeFeedback.textContent = "¡Tu turno! Repite la primera frase.";
            retryButton.style.display = "none";
            recognition.start();
        }
    });

    recognition.onresult = (event) => {
        const last = event.results.length - 1;
        const transcript = normalizeText(event.results[last][0].transcript);
        const phrases = pausePoints[currentPauseIndex].phrases;
        const currentPhrase = normalizeText(phrases[currentPhraseIndex]);

        if (transcript.includes(currentPhrase)) {
            const phraseElements = document.querySelectorAll(".karaoke-phrase");
            if (phraseElements[currentPhraseIndex]) {
                phraseElements[currentPhraseIndex].style.color = "#2ecc71";
            }
            currentPhraseIndex++;
            if (currentPhraseIndex >= phrases.length) {
                karaokeFeedback.textContent = "¡Excelente! Continuando...";
                currentPauseIndex++;
                recognition.stop();
                setTimeout(() => karaokeVideo.play(), 1000);
            } else {
                karaokeFeedback.textContent = `¡Muy bien! Ahora la siguiente...`;
            }
        } else {
            karaokeFeedback.textContent = `Escuché: "${transcript}". Inténtalo de nuevo.`;
            karaokeContent.animate([{ transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0)' }], { duration: 300 });
        }
    };
    
    recognition.onerror = (event) => {
        karaokeFeedback.textContent = `Error de micrófono: ${event.error}. Intenta de nuevo.`;
        retryButton.style.display = "block";
    };

    retryButton.addEventListener("click", () => {
        retryButton.style.display = "none";
        karaokeFeedback.textContent = "Escuchando...";
        recognition.start();
    });
});
