const html = document.querySelector("html");
const btnFocus = document.querySelector(".app__card-button--enfoque");
const btnShort = document.querySelector(".app__card-button--corto");
const btnLong = document.querySelector(".app__card-button--largo");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const musicObjectInput = document.querySelector("#alternar-musica");
const musicSound = new Audio("./sonidos/luna-rise-part-one.mp3");
const musicPlay = new Audio("./sonidos/play.wav");
const musicPause = new Audio("./sonidos/pause.mp3");
const musicEnd = new Audio("./sonidos/beep.mp3");
const btnStarPause = document.querySelector("#start-pause");
const txtStarPause = document.querySelector("#start-pause span");
const iconStarPause = document.querySelector(".app__card-primary-butto-icon");
const timeScreen = document.querySelector("#timer");
let elapsedTime = 1500;
let intervalId = null;
const countdown = () => {
  if (elapsedTime <= 0) {
    musicEnd.play();
    alert("¡Tiempo terminado!");
    reset();
  } else {
    elapsedTime -= 1;
    showTime();
  }
};

musicSound.loop = true;

function activateContext(context, activeButton) {
  html.setAttribute("data-contexto", context);
  banner.setAttribute("src", `./imagenes/${context}.png`);

  switch (context) {
    case "descanso-corto":
      title.innerHTML = `
          <h1 class="app__title">
                ¿Qué tal tomar un respiro?<br>
                <strong class="app__title-strong">¡Haz una pausa corta!</strong>
            </h1>`;
      break;
    case "descanso-largo":
      title.innerHTML = `
          <h1 class="app__title">
                Hora de volver a la superficie<br>
                <strong class="app__title-strong">Haz una pausa larga</strong>
            </h1>`;
      break;
    default:
      title.innerHTML = `
          <h1 class="app__title">
                Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            </h1>`;
      break;
  }

  [btnFocus, btnShort, btnLong].forEach((btn) => {
    btn.classList.toggle("active", btn === activeButton);
  });
}

btnFocus.addEventListener("click", () => {
  elapsedTime = 1500; // Cambia el tiempo aquí
  activateContext("enfoque", btnFocus);
  btnActions(); 
});

btnShort.addEventListener("click", () => {
  elapsedTime = 300; // Cambia el tiempo aquí
  activateContext("descanso-corto", btnShort);
  btnActions(); 
});

btnLong.addEventListener("click", () => {
  elapsedTime = 900; // Cambia el tiempo aquí
  activateContext("descanso-largo", btnLong);
  btnActions(); 
});

musicObjectInput.addEventListener("change", () => {
  if (musicSound.paused) {
    musicSound.play();
  } else {
    musicSound.pause();
  }
});

btnStarPause.addEventListener("click", startPause);

function startPause() {
  if (intervalId) {
    reset();
    changeIcon();
    musicPause.play();
    return;
  }
  intervalId = setInterval(countdown, 1000);
  txtStarPause.textContent = "Pausar";
  musicPlay.play();
  changeIcon();
}

function reset() {
  clearInterval(intervalId);
  intervalId = null;
  txtStarPause.textContent = "Comenzar";
}

function changeIcon() {
  if (txtStarPause.textContent === "Pausar") {
    iconStarPause.setAttribute("src", "./imagenes/pause.png");
    console.log("cambio pausa");
  } else {
    iconStarPause.setAttribute("src", "./imagenes/play_arrow.png");
    console.log("cambio play");
  }
}

function showTime() {
  const time = elapsedTime;
  const minutes = parseInt(time / 60);
  timeScreen.innerText = `${minutes.toString().padStart(2, "0")}:${(time % 60)
    .toString()
    .padStart(2, "0")}`;
}

showTime();

function btnActions() {
  reset(); 
  showTime(); 
  changeIcon();
}
