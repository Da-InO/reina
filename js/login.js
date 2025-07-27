import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// --- Configuración Firebase ---
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

// --- Referencias HTML ---
const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('username');
const errorMsg = document.getElementById('msg');
const emojiBtn = document.getElementById('emojiBtn');
const popup = document.getElementById('popup');
const perfilContainer = document.getElementById('perfilContainer');
const uploadInput = document.getElementById('upload');

// --- Manejo de Login ---
async function handleLogin() {
  const username = usernameInput.value.trim();
  if (!username) {
    errorMsg.textContent = 'Por favor, ingresa tu nombre y apellido';
    return;
  }

  errorMsg.textContent = '';
  try {
    const alumnosRef = collection(db, "alumnos");
    const alumnoQuery = query(alumnosRef, where("nombre", "==", username), where("activo", "==", true));
    const alumnoSnapshot = await getDocs(alumnoQuery);

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

// --- Eventos de login ---
loginBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  handleLogin();
});

usernameInput?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleLogin();
  }
});

// --- Cargar Perfiles desde Firebase ---
function getRandomDefaultImage() {
  const images = ['imagenes/default_nino.png', 'imagenes/default_nina.png'];
  return images[Math.floor(Math.random() * images.length)];
}

async function cargarPerfiles() {
  perfilContainer.innerHTML = ''; // Limpiar

  try {
    const alumnosRef = collection(db, "alumnos");
    const q = query(alumnosRef, where("activo", "==", true));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docSnap) => {
      const alumno = docSnap.data();
      const alumnoId = docSnap.id;

      const perfil = document.createElement('div');
      perfil.classList.add('perfil');

      const img = document.createElement('img');
      img.src = alumno.fotoURL || getRandomDefaultImage();
      img.alt = alumno.nombre;
      img.classList.add('perfil-img');

      const label = document.createElement('p');
      label.textContent = alumno.nombre;

      // Crear botón de editar
      const editBtn = document.createElement('button');
      editBtn.className = 'edit-btn';
      editBtn.textContent = '✏️';

      // Input oculto de subida
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';

      // Al hacer click en ✏️ se abre el input
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
      });

      // Cuando se selecciona una imagen
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (event) {
            img.src = event.target.result;

            // ⚠️ Aquí puedes guardar en Firebase si deseas:
            // updateDoc(doc(db, "alumnos", alumnoId), { fotoURL: event.target.result });

          };
          reader.readAsDataURL(file);
        }
      });

      // Click al perfil: seleccionar usuario
      perfil.addEventListener('click', () => {
        usernameInput.value = alumno.nombre;
        document.body.classList.remove('popup-active');
        popup.classList.remove('show');
      });

      perfil.appendChild(img);
      perfil.appendChild(editBtn);
      perfil.appendChild(fileInput);
      perfil.appendChild(label);
      perfilContainer.appendChild(perfil);
    });

    // "+" para subir nuevo
    const nuevoPerfil = document.createElement('div');
    nuevoPerfil.classList.add('perfil', 'nuevo');
    nuevoPerfil.innerHTML = `<label for="upload" class="add-icon">+</label>`;
    perfilContainer.appendChild(nuevoPerfil);

  } catch (error) {
    console.error("Error al cargar perfiles:", error);
  }
}



// --- Subir imagen personalizada ---
uploadInput?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const perfil = document.createElement('div');
    perfil.classList.add('perfil');

    const img = document.createElement('img');
    img.src = event.target.result;
    img.alt = "Perfil Personalizado";

    const label = document.createElement('p');
    label.textContent = "Mi perfil";

    perfil.appendChild(img);
    perfil.appendChild(label);

    perfil.addEventListener('click', () => {
      usernameInput.value = "Mi perfil";
      document.body.classList.remove('popup-active');
      popup.classList.remove('show');
    });

    perfilContainer.insertBefore(perfil, perfilContainer.lastElementChild);
  };
  reader.readAsDataURL(file);
});

// --- Evento para abrir/cerrar popup ---
document.addEventListener('DOMContentLoaded', () => {
  emojiBtn?.addEventListener('click', () => {
    cargarPerfiles();
    document.body.classList.toggle('popup-active');
    popup.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (
      !e.target.closest('#popup') &&
      !e.target.closest('#emojiBtn') &&
      document.body.classList.contains('popup-active')
    ) {
      document.body.classList.remove('popup-active');
      popup.classList.remove('show');
    }
  });
});
