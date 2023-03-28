const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const TIE = 0;
const WIN = 1;
const LOST = 2;

let isPlaying = false;

const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resultText = document.getElementById("start-text");
const userImg = document.getElementById("user-img");
const machineImg = document.getElementById("machine-img");

const open = document.getElementById('start-text'); //open
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

let videoPpt = document.getElementById('video-ppt');

rockBtn.addEventListener("click", () => {
    play(ROCK);
});
paperBtn.addEventListener("click", () => {
    play(PAPER);
});
scissorsBtn.addEventListener("click", () => {
    play(SCISSORS);
});

function play(userOption) {
    if(isPlaying) return;

    isPlaying = true;

    userImg.src = "imagenes/" + userOption + ".png";

    resultText.innerHTML = "Elijiendo...";

    const interval = setInterval(function(){
        const machineOption = calcMachineOption();
        machineImg.src = "imagenes/" + machineOption + ".png";
    }, 200);

    setTimeout(function () {

        clearInterval(interval);

        const machineOption = calcMachineOption();
        const result = calcResult(userOption, machineOption);

        machineImg.src = "imagenes/" + machineOption + ".png";

        switch (result) {
            case TIE:
                resultText.innerHTML = "EMPATE! 🤣 Tu ejercicio comienza...";
                setTimeout(() => {
                    
                    dispararModal("EMPATE! 🤣")
                    escogerEjercicioAleatorio()
                }, 3000);
                //temporizadorDeRetraso(); 
                //dispararModal("EMPATE 🤣")
                // document.getElementById('video-ppt').src = "https://www.youtube.com/embed/qqPf77IYAKY";
                break;
            case WIN:
                resultText.innerHTML = "GANASTE! 🎉 Tu ejercicio comienza...";
                
                //temporizadorDeRetraso(); 
                setTimeout(() => {
                    
                    dispararModal("GANASTE 🎉")
                    escogerEjercicioAleatorio()
                }, 3000);
                // document.getElementById('video-ppt').src = "https://www.youtube.com/embed/CIlhwMiwHV4";
                break;

            case LOST:
                resultText.innerHTML = "PERDISTE! 😎 Tu ejercicio comienza...";
                setTimeout(() => {
                    
                    dispararModal("PERDISTE 😎")
                    escogerEjercicioAleatorio()
                }, 3000);
                //temporizadorDeRetraso();  
                //dispararModal("PERDISTE 😎")
                // document.getElementById('video-ppt').src = "https://www.youtube.com/embed/CIlhwMiwHV4";
                break;
        }
        isPlaying = false;
    }, 2000);
}

function calcMachineOption() {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
        case 0:
            return ROCK;
        case 1:
            return PAPER;
        case 2:
            return SCISSORS;
    }
}

function calcResult(userOption, machineOption) {
    if (userOption === machineOption) {
        return TIE;

    } else if (userOption === ROCK) {

        if (machineOption === PAPER) return LOST;
        if (machineOption === SCISSORS) return WIN;

    } else if (userOption === PAPER) {

        if (machineOption === SCISSORS) return LOST;
        if (machineOption === ROCK) return WIN;

    } else if (userOption === SCISSORS) {

        if (machineOption === ROCK) return LOST;
        if (machineOption === PAPER) return WIN;

    }
}

// ================================  traer ejercicio aleatorio
let base_ejercicios = readText("base-ejercicios.json")
let interprete_bj = JSON.parse(base_ejercicios)

function escogerEjercicioAleatorio() {
    escogerEjercicio(Math.floor(Math.random()*interprete_bj.length))
  }
  escogerEjercicioAleatorio()
  
  function escogerEjercicio(n) {
    baseDeEjercicios = interprete_bj[n]
    videoAleatorio = baseDeEjercicios.nombre
    
  }
  //onsole.log(baseDeEjercicios)

  function readText(ruta_local) {
    var text = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", ruta_local, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        texto = xmlhttp.responseText;
    }
    return texto
}
//====================================================  MODAL 
function dispararModal(resultado) {

    let ejerAlea = videoAleatorio
    //console.log(resultado)
    Swal.fire({
        title: `${resultado} `,
        html: 'Dale play al video para hacer el ejercicio' +
            '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="'
             + videoAleatorio +
            '" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="jumpjacks20sec1"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        allowOutsideClick: false,
        confirmButtonText: 'Terminé! dame otro...!',
        width: 700,
      }).then((result) => {
        if (result.isConfirmed) {
            resultText.innerHTML = "Hacé click en una opcion 👇";
            escogerEjercicioAleatorio()
          //console.log('cierra modal y sigue juego') 
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            location.reload();
        }
      })
}


//==================================User hace click en comenzar juego
let startButton = document.getElementById("start-button");
let startScreen = document.querySelector(".start-screen");
let displayContainer = document.getElementById("display-container");


startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    //reiniciar();
  });
  //Boton cancelar, esconde juego y deja card de inicio
  window.onload = () => {
    startScreen.classList.remove("hide");
    //displayNuevo.classList.add("hide");
  };
  



