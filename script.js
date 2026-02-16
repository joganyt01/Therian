// --------------------
// 👁 SEGUIR CURSOR
// --------------------
const continueText = document.getElementById("continueText");

const pupils = document.querySelectorAll(".pupil");

const breathingSound = document.getElementById("breathingSound");
const morseSound = document.getElementById("morseSound");

// Ajustamos volumen
breathingSound.volume = 1;
morseSound.volume = 0.15;


document.addEventListener("mousemove", (e) => {

    pupils.forEach(pupil => {

        const rect = pupil.parentElement.getBoundingClientRect();

        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const angle = Math.atan2(
            e.clientY - eyeCenterY,
            e.clientX - eyeCenterX
        );

        const radius = 25;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        pupil.style.transform = `translate(${x}px, ${y}px)`;
    });
});


// --------------------
// ⌨ EFECTO MAQUINA DE ESCRIBIR
// --------------------

const textElement = document.querySelector(".speech-bubble p");
const originalText = textElement.innerText;

textElement.innerText = "";

let index = 0;

function typeWriter() {
    if (index < originalText.length) {
        textElement.innerText += originalText.charAt(index);
        index++;
        setTimeout(typeWriter, 40);
    }
}

window.onload = typeWriter;


// --------------------
// BOTÓN "SÍ QUIERO LOS PASOS"
// --------------------

const yesBtn = document.getElementById("yesBtn");
const speechBubble = document.querySelector(".speech-bubble");
const stepsContainer = document.querySelector(".steps-container");
const stepText = document.getElementById("stepText");



yesBtn.addEventListener("click", () => {

    
    // Fade out burbuja
    speechBubble.classList.add("fade-out");
     startBreathingLoop();

     morseSound.play().then(() => {
        morseSound.pause();
        
    });

    setTimeout(() => {
        speechBubble.style.display = "none";

        // Mostrar pasos con fade in
        stepsContainer.classList.add("fade-in");

        startStep1();

    }, 1000);
});


// --------------------
// PASO 1
// --------------------
function startStep1() {

    const step1 = "Paso 1:Ir Al Catatumbo (La Gerrilla Ama A Los Therian 🤗) ...";
    typeWriterEffect(step1, stepText);

    setTimeout(() => {
        startCountdown();
    }, 3000); // espera a que termine de escribirse
}


// --------------------
// FUNCIÓN MÁQUINA DE ESCRIBIR PARA PASOS
// --------------------

function typeWriterEffect(text, element) {

    
    element.innerText = "";
    let i = 0;

    function typing() {

        if (i < text.length) {

            element.innerText += text.charAt(i);

            // Sonido solo si no es espacio
            if (text.charAt(i) !== " ") {
            
                morseSound.play();
            }

            i++;
            setTimeout(typing, 40);

        }

    }

    typing();
}

const countdownElement = document.getElementById("countdown");
const eyesContainer = document.querySelector(".eyes-container");

function startCountdown() {

    let timeLeft = 5;
    countdownElement.style.opacity = "1";
    countdownElement.innerText = timeLeft;

    eyesContainer.classList.add("zoom-eyes");

    const interval = setInterval(() => {

        timeLeft--;
        countdownElement.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(interval);
            countdownElement.style.opacity = "0";
            showConfirmation();

        }

    }, 1000);
}


function startStep2() {

    const step2 = "Paso 2:Vestirte De Rojo Delante De Un Toro (Activaras Tu Instinto Animal De Therian🐮).";

    stepText.innerText = "";
    typeWriterEffect(step2, stepText);

    setTimeout(() => {
        showContinueText();
    }, 3500);
}

const confirmation = document.getElementById("confirmation");
const confirmBox = document.getElementById("confirmBox");

function showConfirmation() {
    confirmation.classList.add("show-confirmation");
}

confirmBox.addEventListener("change", () => {
  if (confirmBox.checked) {

    confirmation.remove(); // borra el checkbox

    startStep2();

}

});

function showContinueText() {

    continueText.innerText = "Haz click si sientes el cambio.";
    continueText.classList.add("show-continue");

}

continueText.addEventListener("click", () => {

    continueText.style.opacity = "0";

    setTimeout(() => {
        startStep3();
    }, 800);

});

function startStep3() {

    const step3 = "Paso 3: Comer Mucha Comida De Gato Y Perro (Culminaras Con Los Habitos De Un Verdadero Therian💪🏻).";

    stepText.innerText = "";
    typeWriterEffect(step3, stepText);

}

function startBreathingLoop() {

    breathingSound.currentTime = 0;
    breathingSound.play();

    setInterval(() => {
        breathingSound.currentTime = 0;
        breathingSound.play();
    }, 3000); // cada 4 segundos (ajústalo si quieres)
}
