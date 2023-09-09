const numeroActual = document.getElementById("numero-actual");
const numerosAnteriores = document.getElementById("numeros-anteriores");
const btnIniciar = document.getElementById("iniciar");
const btnDetener = document.getElementById("detener"); 

let intervalo;

// Iniciar sorteo
async function inicioSorteo() {
  clearInterval(intervalo);
  intervalo = setInterval(obtenerNuevoNumero, 5000);
} 

// Obtener nuevo número
async function obtenerNuevoNumero() {
  let respuesta = await fetch("/nuevo_numero");
  let numero = await respuesta.text();
  mostrarNuevoNumero(numero);
}

// Mostrar nuevo número
function mostrarNuevoNumero(numero) {
  numeroActual.textContent = numero;
  numerosAnteriores.append(numero + ", ");
}

// Botón iniciar
btnIniciar.addEventListener("click", inicioSorteo);

// Botón detener
btnDetener.addEventListener("click", () => {
  clearInterval(intervalo);
  if(confirm("¿Reiniciar?")) {
    reiniciarJuego();
  }
});

// Reiniciar juego 
async function reiniciarJuego() {
  await fetch("/reiniciar");
  numeroActual.textContent = "";
  numerosAnteriores.innerHTML =  "";
}
