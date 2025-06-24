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
const message = document.getElementById('message');
const listenMessage = document.getElementById('listen-message');
const palabraElemento = document.getElementById('palabra-actual');
const contador = document.getElementById('progress-counter');
const btnSiguiente = document.getElementById('btn-siguiente');
const nivelTitulo = document.getElementById('nivel-actual');

listenMessage.style.display = 'none';

const palabrasPorNivel = {
  facil: ['Agua', 'Ala', 'Ana', 'Arco', 'Ave'],
  intermedio: ['Amigo', 'Azul', 'Aroma', 'Animal', 'Amarillo'],
  dificil: ['Abundante', 'Acelerado', 'Armonioso', 'Ambicioso', 'Absoluto']
};

const niveles = ['facil', 'intermedio', 'dificil'];
let nivelActual = 0;
let indicePalabra = 0;

// Obtener letra de la URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
const letra = getQueryParam('letra') || 'A';

function mostrarPalabra() {
  const nivel = niveles[nivelActual];
  const lista = palabrasPorNivel[nivel];

  palabraElemento.textContent = lista[indicePalabra];
  nivelTitulo.textContent = `Nivel ${nivel.charAt(0).toUpperCase() + nivel.slice(1)}`;
  contador.textContent = `${indicePalabra + 1} - ${lista.length}`;
}

function guardarResultado(palabra, letra, resultado) {
  const fecha = new Date().toISOString();
  addDoc(collection(db, "practicas"), {
    alumno,
    palabra,
    letra,
    resultado,
    fecha
  }).then(() => {
    console.log("Resultado guardado.");
  }).catch(error => {
    console.error("Error guardando resultado:", error);
  });
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
      avanzarPalabra();
    } else {
      message.textContent = `❌ Dijiste: "${dicho}". La palabra era: "${palabra}"`;
      guardarResultado(palabra, letra, "incorrecto");
    }
  };

  recognition.onerror = (event) => {
    listenMessage.style.display = 'none';
    message.textContent = `⚠️(Active el microfono)`;
  };

  recognition.onend = () => {
    listenMessage.style.display = 'none';
  };
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
      contador.textContent = "";
      nivelTitulo.textContent = "";
      btnSiguiente.disabled = true;
    }
  }
}

btnSiguiente.addEventListener('click', () => {
  const palabra = palabraElemento.textContent;

  // Pronunciar
  const utterance = new SpeechSynthesisUtterance(palabra);
  utterance.lang = 'es-ES';
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);

  // Iniciar reconocimiento
  iniciarReconocimiento();
});

// Inicialización
if (!letra) {
  window.location.href = 'index.html';
} else {
  mostrarPalabra();
}
