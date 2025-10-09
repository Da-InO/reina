// Lista de adivinanzas
const adivinanzas = [
    {
        texto: "Tengo agujas pero no pincho, ¿qué soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/almohada.jpg", correct: false, alt: "almohada" },
            { src: "imagenes/Adivinanzas/reloj.png", correct: true, alt: "reloj" },
            { src: "imagenes/Adivinanzas/teclado.jpg", correct: false, alt: "teclado" }
        ]
    },
    {
        texto: "Es una casa con muchas ventanas, ¿qué es?",
        respuestas: [
            { src: "imagenes/Adivinanzas/ventilador.jpg", correct: false, alt: "ventilador" },
            { src: "imagenes/Adivinanzas/television.jpg", correct: true, alt: "televisión" },
            { src: "imagenes/Adivinanzas/nevera.jpg", correct: false, alt: "nevera" }
        ]
    },
    {
        texto: "Cae pero nunca se rompe, ¿qué es?",
        respuestas: [
            { src: "imagenes/Adivinanzas/nieve.jpg", correct: true, alt: "nieve" },
            { src: "imagenes/Adivinanzas/agua.jpg", correct: false, alt: "agua" },
            { src: "imagenes/Adivinanzas/piedra.jpg", correct: false, alt: "piedra" }
        ]
    },
    {
        texto: "Es redondo y brilla en el cielo, ¿qué es?",
        respuestas: [
            { src: "imagenes/Adivinanzas/luna.jpg", correct: true, alt: "luna" },
            { src: "imagenes/Adivinanzas/sol.jpg", correct: false, alt: "sol" },
            { src: "imagenes/Adivinanzas/estrella.jpg", correct: false, alt: "estrella" }
        ]
    },
    {
        texto: "No es un coche, pero tiene ruedas. ¿Qué es?",
        respuestas: [
            { src: "imagenes/Adivinanzas/bicicleta.jpg", correct: true, alt: "bicicleta" },
            { src: "imagenes/Adivinanzas/pelota.jpg", correct: false, alt: "pelota" },
            { src: "imagenes/Adivinanzas/zapatillas.jpg", correct: false, alt: "zapatillas" }
        ]
    },
    {
        texto: "Me ves en el cielo cuando llueve, ¿qué soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/arcoiris.jpg", correct: true, alt: "arcoiris" },
            { src: "imagenes/Adivinanzas/sol.jpg", correct: false, alt: "sol" },
            { src: "imagenes/Adivinanzas/nube.jpg", correct: false, alt: "nube" }
        ]
    },
    {
        texto: "Me como con pan, soy muy sabroso. ¿Quién soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/queso.jpg", correct: true, alt: "queso" },
            { src: "imagenes/Adivinanzas/jamon.jpg", correct: false, alt: "jamon" },
            { src: "imagenes/Adivinanzas/ensalada.jpg", correct: false, alt: "ensalada" }
        ]
    },
    {
        texto: "No soy animal, pero hago mucho ruido. ¿Quién soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/coche.jpg", correct: true, alt: "coche" },
            { src: "imagenes/Adivinanzas/perro.jpg", correct: false, alt: "perro" },
            { src: "imagenes/Adivinanzas/campana.jpg", correct: false, alt: "campana" }
        ]
    },
    {
        texto: "Tengo un cuerpo largo y puedo volar, ¿qué soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/avion.jpg", correct: true, alt: "avion" },
            { src: "imagenes/Adivinanzas/corredor.jpg", correct: false, alt: "corredor" },
            { src: "imagenes/Adivinanzas/bote.jpg", correct: false, alt: "bote" }
        ]
    },
    {
        texto: "Me encuentro dentro de una caja, pero no soy una sorpresa, ¿qué soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/computadora.jpg", correct: true, alt: "computadora" },
            { src: "imagenes/Adivinanzas/juguetes.jpg", correct: false, alt: "juguetes" },
            { src: "imagenes/Adivinanzas/bocadillos.jpg", correct: false, alt: "bocadillos" }
        ]
    },
    {
        texto: "Soy una fruta amarilla, pero no soy limón, ¿qué soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/mango.jpg", correct: false, alt: "mango" },
            { src: "imagenes/Adivinanzas/platano.jpg", correct: true, alt: "platano" },
            { src: "imagenes/Adivinanzas/pera.jpg", correct: false, alt: "pera" }
        ]
    },
    {
        texto: "Vivo en el mar, pero no soy pez, ¿qué soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/ballena.jpg", correct: true, alt: "ballena" },
            { src: "imagenes/Adivinanzas/delfin.jpg", correct: false, alt: "delfin" },
            { src: "imagenes/Adivinanzas/estrella-mar.jpg", correct: false, alt: "estrella mar" }
        ]
    },
    {
        texto: "Cuanto más quito, más grande me hago, ¿qué soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/agujero.jpg", correct: true, alt: "agujero" },
            { src: "imagenes/Adivinanzas/montaña.jpg", correct: false, alt: "montaña" },
            { src: "imagenes/Adivinanzas/cuaderno.jpg", correct: false, alt: "cuaderno" }
        ]
    },
    {
        texto: "No tiene boca pero siempre come, ¿qué es?",
        respuestas: [
            { src: "imagenes/Adivinanzas/fuego.jpg", correct: true, alt: "fuego" },
            { src: "imagenes/Adivinanzas/animal.jpg", correct: false, alt: "animal" },
            { src: "imagenes/Adivinanzas/planta.jpg", correct: false, alt: "planta" }
        ]
    },
    {
        texto: "Aunque tiene dientes, no puede morder. ¿Qué es?",
        respuestas: [
            { src: "imagenes/Adivinanzas/peine.jpg", correct: true, alt: "peine" },
            { src: "imagenes/Adivinanzas/rio.jpg", correct: false, alt: "rio" },
            { src: "imagenes/Adivinanzas/relampago.jpg", correct: false, alt: "relampago" }
        ]
    },
    {
        texto: "Soy invisible pero todo lo cubro, ¿qué soy?",
        respuestas: [
            { src: "imagenes/Adivinanzas/viento.jpg", correct: true, alt: "viento" },
            { src: "imagenes/Adivinanzas/agua.jpg", correct: false, alt: "agua" },
            { src: "imagenes/Adivinanzas/luz.jpg", correct: false, alt: "luz" }
        ]
    }
];


let currentQuestionIndex = 0;

// Función para cargar la adivinanza actual
function loadAdivinanza() {
    const adivinanza = adivinanzas[currentQuestionIndex];
    document.getElementById("adivinanza-texto").textContent = adivinanza.texto;

    const respuestaImages = document.querySelectorAll(".respuesta");
    respuestaImages.forEach((img, index) => {
        img.src = adivinanza.respuestas[index].src;
        img.alt = adivinanza.respuestas[index].alt; // Actualiza también el atributo "alt" de las imágenes
        img.setAttribute("data-correct", adivinanza.respuestas[index].correct);
    });
}

// Función para mostrar el resultado
function showResult(isCorrect) {
    const resultado = document.getElementById("resultado");
    const resultadoTexto = document.getElementById("resultado-texto");
    const resultadoIcono = document.getElementById("resultado-icon");

    resultado.style.display = "flex"; // Mostrar el cuadro flotante
    if (isCorrect) {
        resultadoTexto.textContent = "¡Correcto!";
        resultadoIcono.src = "imagenes/check-verde.png"; // Tu imagen de check verde
    } else {
        resultadoTexto.textContent = "¡Intenta de nuevo!";
        resultadoIcono.src = "imagenes/x-roja.png"; // Tu imagen de X roja
    }

    setTimeout(() => {
        resultado.style.display = "none"; // Ocultar el cuadro flotante
        currentQuestionIndex++;
        if (currentQuestionIndex < adivinanzas.length) {
            loadAdivinanza(); // Cargar la siguiente adivinanza
        } else {
            alert("¡Felicidades! Has completado todas las adivinanzas.");
        }
    }, 1000);
}

// Función para manejar la selección de respuestas
function checkAnswer(e) {
    const isCorrect = e.target.getAttribute("data-correct") === "true";
    showResult(isCorrect);
}

// Asignar el evento de clic a las imágenes de respuesta
document.querySelectorAll(".respuesta").forEach(img => {
    img.addEventListener("click", checkAnswer);
});

// Cargar la primera adivinanza
loadAdivinanza();
