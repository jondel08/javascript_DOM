const html = document.querySelector("html");
const btnFocus = document.querySelector(".app__card-button--enfoque");
const btnShort = document.querySelector(".app__card-button--corto");
const btnLong = document.querySelector(".app__card-button--largo");

btnFocus.addEventListener("click", () => {
  html.setAttribute("data-contexto", "enfoque");
});

btnShort.addEventListener("click", () => {
  html.setAttribute("data-contexto", "descanso-corto");
});

btnLong.addEventListener("click", () => {
  html.setAttribute("data-contexto", "descanso-largo");
});
