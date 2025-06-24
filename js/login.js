import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCIgbuAkRg8ZfecTlGRTqVatIvOxcYl3A",
  authDomain: "aventurasonoramagica.firebaseapp.com",
  projectId: "aventurasonoramagica",
  storageBucket: "aventurasonoramagica.appspot.com",
  messagingSenderId: "544708290123",
  appId: "1:544708290123:web:ad5413929dd5fd12b68fce",
  measurementId: "G-C753SEVD4D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('username');
const errorMsg = document.getElementById('msg');

// Función que contiene la lógica de login (extraída del event listener original)
async function handleLogin() {
  const username = usernameInput.value.trim();
  if (!username) {
    errorMsg.textContent = 'Por favor, ingresa tu nombre y apellido';
    return;
  }

  errorMsg.textContent = '';
  console.log("Buscando alumno:", username);

  try {
    const alumnosRef = collection(db, "alumnos");
    const alumnoQuery = query(alumnosRef, where("nombre", "==", username), where("activo", "==", true));
    const alumnoSnapshot = await getDocs(alumnoQuery);

    console.log("Resultados alumno:", alumnoSnapshot.size);
    if (alumnoSnapshot.empty) {
      errorMsg.textContent = 'Alumno no encontrado o inactivo.';
      return;
    }

    const maestrosRef = collection(db, "maestros");
    const maestrosQuery = query(maestrosRef, where("activo", "==", true));
    const maestrosSnapshot = await getDocs(maestrosQuery);

    let alumnoAsignado = false;
    maestrosSnapshot.forEach(doc => {
      const maestro = doc.data();
      console.log("Maestro:", maestro.nombre, "Alumnos:", maestro.alumnos);
      if (Array.isArray(maestro.alumnos) && maestro.alumnos.includes(username)) {
        alumnoAsignado = true;
      }
    });

    if (!alumnoAsignado) {
      errorMsg.textContent = 'Alumno no está asignado a ningún maestro activo.';
      return;
    }

    localStorage.setItem('reina_username', username);
    window.location.href = 'index.html';

  } catch (error) {
    console.error(error);
    errorMsg.textContent = 'Error al conectar con la base de datos.';
  }
}

// Evento para el botón
loginBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Previene cualquier comportamiento por defecto
  handleLogin();
});

// Evento para el Enter en el input
usernameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // Previene cualquier comportamiento por defecto
    handleLogin();
  }
});