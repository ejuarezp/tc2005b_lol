const express = require('express');
const router = express.Router();

const personajes = [
    {
        nombre: "Gwen",
        descripcion: `Gwen, una antigua muñeca que se transformó y cobró vida a través de la magia, 
            usa las mismas herramientas que en su momento la crearon. 
            Lleva el peso del amor de su creadora a cada paso, sin dar nada por sentado. 
            Bajo su mando está la Niebla Sagrada, una magia antigua y protectora que bendijo las tijeras, 
            las agujas y el hilo de coser de Gwen. Muchas cosas son nuevas para Gwen, 
            pero sigue decidida a luchar con gozo por el bien que prevalece en un mundo roto.`,
        tipo: "mago",
        imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg",
    },
    {
        nombre: "Mordekaiser",
        descripcion: `Mordekaiser es un señor de la guerra nigromante que domina el carril superior con 
            daño mágico sostenido, gran aguante y una definitiva que aísla a enemigos en su "reino de la muerte". 
            Destaca por su pasiva de daño en área, su maza Ocaso y su capacidad para robar estadísticas, 
            siendo popular por su contundencia.`,
        tipo: "tanque",
        imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Mordekaiser_0.jpg",
    },
    {
        nombre: "Jax",
        descripcion: `Inigualable tanto en sus habilidades de armamentos únicos como en su mordaz sarcasmo, 
        Jax es el último maestro de armas conocido de Icathia. 
        Después de que su tierra natal fue destruida por su propia arrogancia al desencadenar el Vacío, 
        Jax y su especie juraron proteger lo poco que quedó. Mientras la magia aumenta en el mundo, 
        la amenaza durmiente se agita una vez más, y Jax vaga por Valoran, portando la última luz de 
        Icathia y poniendo a prueba a todos los guerreros que conoce para ver si son suficientemente 
        fuertes para erguirse a su lado...`,
        tipo: "tanque",
        imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jax_0.jpg",
    },
];

const html_header = ``;
const html_footer = ``;
const html_form = ``;

//Middleware
router.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

router.get('/new', (request, response, next) => {
    response.render('new');
});

router.post('/new', (request, response, next) => {
    console.log(request.body);
    personajes.push(request.body);
    response.send(html_header + html_form + html_footer);
});

router.get('/old', (request, response, next) => {
    const path = require('path');
    response.sendFile(path.join(__dirname, '..', 'old_labs', 'index.html'));
});

router.use((request, response, next) => {
    let html_index = `
            <a class="button is-primary" href="/personajes/new">Nuevo personaje</a>
            <div class="columns">
        `;

        for (let personaje of personajes) {
            html_index += `
                <div class="column">
                    ${personaje.nombre}
                    <figure class="image">
                        <img class="is-rounded" src="${personaje.imagen}" />
                    </figure>
                </div>
            `;
        }

        html_index += `
                    </div>
                </div>
            </section>
        `;

    response.send(html_header + html_index + html_footer); //Manda la respuesta
});

module.exports = router;