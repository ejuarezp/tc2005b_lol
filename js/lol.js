//document es el pretotipo que contiene el DOM (Document Object Model)
//console.log(document);
const gwen = {
    nombre: "Gwen",
    descripcion: `Gwen, una antigua muñeca que se transformó y cobró vida a través de la magia, 
        usa las mismas herramientas que en su momento la crearon. 
        Lleva el peso del amor de su creadora a cada paso, sin dar nada por sentado. 
        Bajo su mando está la Niebla Sagrada, una magia antigua y protectora que bendijo las tijeras, 
        las agujas y el hilo de coser de Gwen. Muchas cosas son nuevas para Gwen, 
        pero sigue decidida a luchar con gozo por el bien que prevalece en un mundo roto.`,
    tipo: "mago",
    imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg",
}

const div_gwen = document.getElementById("gwen");
console.log(div_gwen);

const mostrar_datos = () => {
    div_gwen.innerHTML = `
        <p class="is-size-2">${gwen.nombre}</p>
        <p>${gwen.descripcion}</p>
        <span class="tag">${gwen.tipo}</span>
    `;
    div_gwen.onclick = mostrar_imagen;
}

const mostrar_imagen = () => {
    div_gwen.innerHTML = `
        <figure class="image">
            <img class="is-rounded" src="${gwen.imagen}" />
        </figure>
    `;
    div_gwen.onclick = mostrar_datos;
}

mostrar_imagen();

div_gwen.onclick = mostrar_datos;