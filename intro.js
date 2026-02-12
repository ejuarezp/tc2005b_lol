// consola (log, info, warn, error, assert)
console.log("hola mundo!");
console.info("Creado en el 2009");
console.warn("Es adictivo");
console.error("Los tanques no deben ir atrás");

//== ---> Operador de comparación de valores
console.assert(1 == true);

//=== ---> Operador "estrictamente igual" de comparación de valor y tipo
console.assert(1 === true);


//--------------- variables, constantes---------------

//Forma antigua de declarar variables. 
//Tiene mayor alcance por lo que no se recomienda
var personaje_1 = "Gwen";

//Forma moderna de declarar variables.
//La variable sólo vive dentro del ámbito donde es declarada
let personaje_2 = "Mordkeiser";

//Declarar constantes con const
const precio_skin = 300;

// Alcance de las variables
{
    var personaje_3 = "Jax";
    let personaje_4 = "Garen";
}

console.log(personaje_3);
//La siguiente línea genera un error porque personaje_4 murió hace 3 líneas.
//console.log(personaje_4);


//------------------ alert, prompt, confirm
alert("No juegues esto por favor");

const personaje_favorito = prompt("¿Cuál es tu personaje favorito?");
console.info("Personaje favorito: " + personaje_favorito);

const hoy_hay_juego = confirm("¿Un jueguito?");

//----------------- funciones tradicionales
function descargar() {
    window.location.href = "https://www.leagueoflegends.com/es-mx/";
}

if (hoy_hay_juego) {
    descargar();
} else {
    console.info("Buen día");
}


// funciones modernas
() => {}

document.getElementById("boton_desinstalar").onclick = () => {
    alert("jojojo no se puede desinstalar");
}

const iniciar_partida = () => {
    alert("Iniciar partida...");
}

iniciar_partida();


//------------------ arreglos

const personajes = ["Fizz"];

const arreglo2 = new Array();

personajes.push("Irelia");
personajes[10] = "Leona";

//arreglos asociativos
personajes["hola"] = "Lux";

//recorrido tradicional del arreglo
for (let i = 0; i < personajes.length; i++) {
    console.log(personajes[i]);
}

//recorridos alternativos del arreglo
for(let personaje in personajes) {
    console.log(personaje);
}


















//Objetos


//const objeto = {} 




















// modificar html