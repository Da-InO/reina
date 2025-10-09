import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const alumno = localStorage.getItem('reina_username') || 'Invitado';

// Elementos del DOM
const message = document.getElementById('message');
const listenMessage = document.getElementById('listen-message');
const palabraElemento = document.getElementById('palabra-actual');
const palabraImagen = document.getElementById('palabra-imagen'); // Elemento de imagen
const contador = document.getElementById('progress-counter');
const btnSiguiente = document.getElementById('btn-siguiente');
const nivelTitulo = document.getElementById('nivel-actual');
const levelEmoji = document.getElementById('level-emoji');

listenMessage.style.display = 'none';

// ----- INICIO DE CAMBIOS -----
// Nueva estructura de datos:
// - Si una palabra tiene imagen, se define como un objeto.
// - Si no tiene imagen, se deja como un simple texto (string).
const palabrasPorNivel = {
    facil: [
        { palabra: 'Agua', imagen: 'imagenes/Agua_potable.jpg' },
        'Ala',  // Esta palabra no tiene imagen todavía
        'Ana',   // Esta tampoco
        'Arco',
        'Ave'
    ],
    intermedio: [
        'Amigo', 'Azul', 'Aroma', 'Animal', 'Amarillo'
    ],
    dificil: [
        'Abundante', 'Acelerado', 'Armonioso', 'Ambicioso', 'Absoluto'
    ]
};

const levelEmojis = {
    facil: '😊',
    intermedio: '🤔',
    dificil: '🤯'
};
// ----- FIN DE CAMBIOS -----

const niveles = ['facil', 'intermedio', 'dificil'];
let nivelActual = 0;
let indicePalabra = 0;

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
const letra = getQueryParam('letra') || 'A';

function mostrarPalabra() {
    const nivel = niveles[nivelActual];
    const lista = palabrasPorNivel[nivel];
    const itemActual = lista[indicePalabra];

    let palabra, imagen;

    if (typeof itemActual === 'object' && itemActual !== null) {
        palabra = itemActual.palabra;
        imagen = itemActual.imagen;
    } else {
        palabra = itemActual;
        imagen = null;
    }

    palabraElemento.textContent = palabra;

    if (imagen) {
        palabraImagen.src = imagen;
        palabraImagen.alt = `Imagen de ${palabra}`;
        palabraImagen.style.display = 'block';
    } else {
        palabraImagen.style.display = 'none';
    }

    // ----- CÓDIGO AÑADIDO -----
    nivelTitulo.textContent = `Nivel ${nivel.charAt(0).toUpperCase() + nivel.slice(1)}`;
    levelEmoji.textContent = levelEmojis[nivel]; // <-- Esta línea añade el emoji

    // Opcional: Si quieres mantener el contador numérico
    if (contador) {
        contador.textContent = `${indicePalabra + 1} / ${lista.length}`;
    }
}


function avanzarPalabra() {
    const lista = palabrasPorNivel[niveles[nivelActual]];
    indicePalabra++;
    if (indicePalabra < lista.length) {
        mostrarPalabra();
    } else {
        nivelActual++;
        indicePalabra = 0;
        if (nivelActual < niveles.length) {
            mostrarPalabra();
        } else {
            palabraElemento.textContent = "🎉 ¡Has completado todo!";
            palabraImagen.style.display = 'none'; // Ocultamos la imagen al final
            contador.textContent = "";
            nivelTitulo.textContent = "";
            levelEmoji.textContent = "";
            btnSiguiente.disabled = true;
        }
    }
}

function guardarResultado(palabra, letra, resultado) {
    const fecha = new Date().toISOString();
    addDoc(collection(db, "practicas"), {
        alumno, palabra, letra, resultado, fecha
    }).catch(error => console.error("Error guardando resultado:", error));
}

function iniciarReconocimiento() {
    if (!SpeechRecognition) {
        alert("Tu navegador no soporta reconocimiento de voz.");
        return;
    }
    const palabra = palabraElemento.textContent;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    listenMessage.style.display = 'block';
    message.textContent = "";

    recognition.start();

    recognition.onresult = (event) => {
        const dicho = event.results[0][0].transcript.trim().toLowerCase();
        listenMessage.style.display = 'none';

        if (dicho === palabra.toLowerCase()) {
            message.textContent = `✅ ¡Correcto! Dijiste: "${dicho}"`;
            guardarResultado(palabra, letra, "correcto");
            // Usamos un pequeño retraso para que el usuario vea el mensaje de "Correcto"
            setTimeout(() => {
                avanzarPalabra();
                message.textContent = ""; // Limpiamos el mensaje para la siguiente palabra
            }, 1200);
        } else {
            message.textContent = `❌ Intenta de nuevo. Dijiste: "${dicho}"`;
            guardarResultado(palabra, letra, "incorrecto");
        }
    };
    recognition.onerror = (event) => {
        listenMessage.style.display = 'none';
        message.textContent = `⚠️ Error de micrófono. Asegúrate de darle permiso.`;
    };
    recognition.onend = () => {
        listenMessage.style.display = 'none';
    };
}

btnSiguiente.addEventListener('click', () => {
    const palabra = palabraElemento.textContent;
    const utterance = new SpeechSynthesisUtterance(palabra);
    utterance.lang = 'es-ES';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    // Pequeña pausa después de hablar para que el micro no se active tan rápido
    setTimeout(iniciarReconocimiento, 500);
});

// Inicialización
if (!letra) {
    window.location.href = 'index.html';
} else {
    mostrarPalabra();
}