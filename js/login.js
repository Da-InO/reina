import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

/* ---- Firebase ---- */
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
const db  = getFirestore(app);

/* ---- DOM ---- */
const loginBtn        = document.getElementById('loginBtn');
const usernameInput   = document.getElementById('username');
const errorMsg        = document.getElementById('msg');

const emojiBtn        = document.getElementById('emojiBtn');
const popup           = document.getElementById('popup');
const perfilContainer = document.getElementById('perfilContainer');

const addBtn    = document.getElementById('addBtn');
const addPanel  = document.getElementById('addPanel');
const addName   = document.getElementById('addName');
const addTeacher= document.getElementById('addTeacher');
const createBtn = document.getElementById('createBtn');
const cancelBtn = document.getElementById('cancelBtn');

/* ---- Login ---- */
async function handleLogin() {
  const username = (usernameInput.value || '').trim();
  if (!username) { errorMsg.textContent = 'Por favor, ingresa tu nombre y apellido'; return; }

  errorMsg.textContent = '';
  try {
    const alumnosRef = collection(db, "alumnos");
    const alumnoQuery = query(alumnosRef, where("nombre", "==", username), where("activo", "==", true));
    const alumnoSnapshot = await getDocs(alumnoQuery);
    if (alumnoSnapshot.empty) { errorMsg.textContent = 'Alumno no encontrado o inactivo.'; return; }

    const maestrosRef = collection(db, "maestros");
    const maestrosQuery = query(maestrosRef, where("activo", "==", true));
    const maestrosSnapshot = await getDocs(maestrosQuery);

    let alumnoAsignado = false;
    maestrosSnapshot.forEach(d => {
      const maestro = d.data();
      if (Array.isArray(maestro.alumnos) && maestro.alumnos.includes(username)) alumnoAsignado = true;
    });

    if (!alumnoAsignado) { errorMsg.textContent = 'Alumno no está asignado a ningún maestro activo.'; return; }

    localStorage.setItem('reina_username', username);
    window.location.href = 'index.html';
  } catch (err) {
    console.error(err);
    errorMsg.textContent = 'Error al conectar con la base de datos.';
  }
}
loginBtn?.addEventListener('click', e => { e.preventDefault(); handleLogin(); });
usernameInput?.addEventListener('keypress', e => { if (e.key === 'Enter'){ e.preventDefault(); handleLogin(); }});

/* ---- Avatares por defecto ---- */
const PROFILE_IMAGES_LOCAL = [
  'imagenes/perfiles/perfil1.png',
  'imagenes/perfiles/perfil2.png',
  'imagenes/perfiles/perfil3.png',
  'imagenes/perfiles/perfil4.png',
  'imagenes/perfiles/perfil5.png',
  'imagenes/perfiles/perfil6.png',
  'imagenes/perfiles/perfil7.png'
];
const FALLBACK_DEFAULTS = ['imagenes/default_nino.png', 'imagenes/default_nina.png'];
function makeNoRepeatPicker(arr){
  const pool = (arr?.length ? [...arr] : [...FALLBACK_DEFAULTS]);
  for (let i=pool.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }
  let idx=0; return ()=> pool[(idx++)%pool.length];
}

/* ---- Cargar perfiles en el popup ---- */
async function cargarPerfiles() {
  perfilContainer.innerHTML = '';
  const pickDefault = makeNoRepeatPicker(PROFILE_IMAGES_LOCAL);
  try {
    const qs = await getDocs(query(collection(db,"alumnos"), where("activo","==",true)));
    qs.forEach(snap=>{
      const a = snap.data();
      const card = document.createElement('div');
      card.className = 'perfil';
      const img = document.createElement('img');
      img.className = 'perfil-img';
      img.src = a.fotoURL || pickDefault();
      img.alt = a.nombre;
      const p = document.createElement('p'); p.textContent = a.nombre;
      card.append(img, p);
      card.addEventListener('click', ()=>{
        usernameInput.value = a.nombre;
        document.body.classList.remove('popup-active');
        popup.classList.remove('show');
      });
      perfilContainer.appendChild(card);
    });
  } catch(err){ console.error('Error al cargar perfiles:', err); }
}

/* ---- Popup perfiles ---- */
document.addEventListener('DOMContentLoaded', ()=>{
  emojiBtn?.addEventListener('click', ()=>{
    cargarPerfiles();
    document.body.classList.toggle('popup-active');
    popup.classList.toggle('show');
  });

  document.addEventListener('click', (e)=>{
    if (!e.target.closest('#popup') && !e.target.closest('#emojiBtn') && document.body.classList.contains('popup-active')){
      document.body.classList.remove('popup-active');
      popup.classList.remove('show');
    }
  });

  // Botón + fijo (esquina izquierda)
  addBtn?.addEventListener('click', (e)=>{ e.stopPropagation(); toggleAddPanel(); });
  cancelBtn?.addEventListener('click', ()=> { addPanel.classList.remove('show'); addPanel.setAttribute('aria-hidden','true'); });
  createBtn?.addEventListener('click', ()=> createAlumno());
  addName?.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ e.preventDefault(); createAlumno(); }});
});

/* ---- Panel crear alumno ---- */
async function toggleAddPanel(){
  // Rellenar maestros activos
  addTeacher.innerHTML = '<option value="">Selecciona maestro</option>';
  try{
    const qs = await getDocs(query(collection(db,'maestros'), where('activo','==',true)));
    qs.forEach(d=>{
      const data = d.data();
      const opt = document.createElement('option');
      opt.value = d.id;
      opt.textContent = data?.nombre || '(sin nombre)';
      addTeacher.appendChild(opt);
    });
  }catch(err){ console.error('No se pudieron cargar los maestros:', err); }

  addPanel.classList.toggle('show');
  addPanel.setAttribute('aria-hidden', addPanel.classList.contains('show') ? 'false' : 'true');
  if (addPanel.classList.contains('show')) setTimeout(()=> addName.focus(), 0);
}

async function createAlumno(){
  const nombre = (addName.value || '').trim();
  const maestroId = addTeacher.value;
  if (!nombre || !maestroId) return;

  try{
    const dup = await getDocs(query(collection(db,'alumnos'), where('nombre','==',nombre), where('activo','==',true)));
    if (!dup.empty){ alert('Ya existe un alumno activo con ese nombre.'); return; }

    const pickDefault = makeNoRepeatPicker(PROFILE_IMAGES_LOCAL);
    const fotoURL = pickDefault();

    await addDoc(collection(db,'alumnos'), { nombre, activo:true, fotoURL });
    await updateDoc(doc(db,'maestros', maestroId), { alumnos: arrayUnion(nombre) });

    // Añadir a la UI si el popup está abierto
    if (document.body.classList.contains('popup-active')){
      const card = document.createElement('div');
      card.className = 'perfil';
      const img = document.createElement('img'); img.className='perfil-img'; img.src=fotoURL; img.alt=nombre;
      const p = document.createElement('p'); p.textContent = nombre;
      card.append(img,p);
      card.addEventListener('click', ()=>{
        usernameInput.value = nombre;
        document.body.classList.remove('popup-active'); popup.classList.remove('show');
      });
      perfilContainer.appendChild(card);
    }

    addName.value=''; addTeacher.value='';
    addPanel.classList.remove('show'); addPanel.setAttribute('aria-hidden','true');
  }catch(err){
    console.error('Error creando alumno:', err);
    alert('Ocurrió un error al crear el alumno.');
  }
}
