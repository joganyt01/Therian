const continueText = document.getElementById("continueText");
const pupils = document.querySelectorAll(".pupil");
const breathingSound = document.getElementById("breathingSound");
const morseSound = document.getElementById("morseSound");

// Ajustamos volumen
breathingSound.volume = 1;
morseSound.volume = 0.15;

//seguir el cursor


function moveEyes(x, y) {


    pupils.forEach(pupil => {

        const rect = pupil.parentElement.getBoundingClientRect();

        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const angle = Math.atan2(
            y - eyeCenterY,
            x - eyeCenterX
        );

        const radius = 20; // un poco más natural que 25

        const moveX = Math.cos(angle) * radius;
        const moveY = Math.sin(angle) * radius;

        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;

    });
}

// 🖱 Desktop
document.addEventListener("mousemove", (e) => {
    moveEyes(e.clientX, e.clientY);
});

// 📱 Mobile
document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    moveEyes(touch.clientX, touch.clientY);
});

// También reaccionan al primer toque
document.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    moveEyes(touch.clientX, touch.clientY);
});

// efecto maquina de escribir
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


// boton si quiero los pasos
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


// paso 1
function startStep1() {

    const step1 = "Paso 1:Ir Al Catatumbo (La Gerrilla Ama A Los Therian 🤗) ...";
    typeWriterEffect(step1, stepText);

    setTimeout(() => {
        startCountdown();
    }, 3000); // espera a que termine de escribirse
}


// funcion maquina de escribir para pasos

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

      // Esperar a que termine de escribirse y luego finalizar
    setTimeout(() => {
        finishExperience();
    }, step3.length * 40 + 800); 

}

function startBreathingLoop() {

    breathingSound.currentTime = 0;
    breathingSound.play();

    setInterval(() => {
        breathingSound.currentTime = 0;
        breathingSound.play();
    }, 3000); // cada 4 segundos 
}

function finishExperience() {

    const confirmation = document.getElementById("confirmation");
    const continueText = document.getElementById("continueText");
    const stepText = document.getElementById("stepText");

    // Ocultar elementos interactivos
   if (confirmation) {
    confirmation.style.opacity = "0";
    confirmation.style.display = "none";
}

if (continueText) {
    continueText.style.opacity = "0";
    continueText.style.display = "none";
}


    setTimeout(() => {
        confirmation.style.display = "none";
        continueText.style.display = "none";
    }, 500);

    // Mensaje final
    setTimeout(() => {

        typeWriterEffect(
            "y Recuerda Todos Quieren Alos Therian Sal Ala Calle Y Lo Veras☺️.",
            stepText
        );

    }, 800);

    // Bajar respiración gradualmente
    let fadeAudio = setInterval(() => {
        if (breathingSound.volume > 0.05) {
            breathingSound.volume -= 0.02;
        } else {
            breathingSound.pause();
            clearInterval(fadeAudio);
        }
    }, 200);

}
