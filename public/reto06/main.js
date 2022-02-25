// LISTADO POKEMON

let pokemons = [
    {"id":"1","nombre":"bellsprout","descripcion":"Prefiere lugares calidos y humedos. Atrapa peque�os Pokemon insectos con sus lianas para devorarlos.","img":"./img/bellsprout.png","tipo":"planta","debilidad":"[fuego, volador]"}
    ,
    {"id":"2","nombre":"bulbasaur","descripcion":"Este Pokemon nace con una semilla en el lomo, que brota con el paso del tiempo.","img":"./img/bulbasaur.png","tipo":"planta","debilidad":"[fuego, volador]"},
    {"id":"3","nombre":"electabuzz","descripcion":"Es habitual que las centrales electricas cuenten con Pokemon de tipo Tierra para hacer frente a los Electabuzz avidos de electricidad.","img":"./img/electabuzz.png","tipo":"electrico","debilidad":"[tierra]"},
    {"id":"4","nombre":"growlithe","descripcion":"De naturaleza valiente y honrada, se enfrenta sin miedo a enemigos mas grandes y fuertes.","img":"./img/growlithe.png","tipo":"fuego","debilidad":"[agua]"},
    {"id":"5","nombre":"jolteon","descripcion":"Si se enfada o asusta, se le eriza el pelaje. Cada uno de sus pelos se convierte en una afilada pua que hace trizas al rival.","img":"./img/jolteon.png","tipo":"electrico","debilidad":"[tierra]"},
    {"id":"6","nombre":"krabby","descripcion":"Es facil encontrarlo cerca del mar. Las largas pinzas que tiene vuelven a crecer si se las quitan de su sitio.","img":"./img/krabby.png","tipo":"agua","debilidad":"[planta, electrico]"},
    {"id":"7","nombre":"pidgeotto","descripcion":"Su extraordinaria vitalidad y resistencia le permiten cubrir grandes distancias del territorio que habita en busca de presas.","img":"./img/pidgeotto.png","tipo":"volador","debilidad":"[electrico, hielo, roca]"},
    {"id":"8","nombre":"pikachu","descripcion":"Cuanto mas potente es la energia electrica que genera este Pokemon, mas suaves y elasticas se vuelven las bolsas de sus mejillas.","img":"./img/pikachu.png","tipo":"electrico","debilidad":"[tierra]"},
    {"id":"9","nombre":"psyduck","descripcion":"Siempre padece dolores de cabeza. Tras desatar sus misteriosos poderes, la jaqueca remite unos instantes.","img":"./img/psyduck.png","tipo":"agua","debilidad":"[planta, electrico]"},
    {"id":"10","nombre":"squirtle","descripcion":"Cuando retrae su largo cuello en el caparazon, dispara agua a una presion increible.","img":"./img/squirtle.png","tipo":"agua","debilidad":"[planta, electrico]"}
    ];

// SECCIONES
let home = document.querySelector('#home') // home
let loadingPage = document.querySelector('#loadingPage') // loading page
let showCards = document.querySelector('#showCards') // mostrar cartas
let gamePlay = document.querySelector('#gamePlay') // game play
let gameResult = document.querySelector('#gameResult') // resultado
let gameSaved = document.querySelector('#gameSaved')
//----- HOME ----------------------------------

// botones
let startBtn = document.querySelector('#startBtn');
let faq = document.querySelectorAll('.faq');
// inputs
let pj1 = document.querySelector('#entrenador1 input');
let pj2 = document.querySelector('#entrenador2 input');
// partidas guardadas
let pGuardadasElem = [];
let contadorPartidas = 0;
let pGuardadas = document.querySelector('#partidasGuardadas')
let pGuardadasLista = document.querySelector('#partidasGuardadas ul')


//----- SHOW CARDS ----------------------------

// botones
let closeBtn = document.querySelector('#clsBtn');

// Campos a renombrar
let cards = document.querySelectorAll('[data-type="card"]');

// card.children[0].children[0] // player name
// card.children[1].children[0] // pokemon img
// card.children[2].children[0] // pokemon name
// card.children[3].children[0] // pokemon descripcion

//----- GAME PLAY ------------------------------

// botones
let batallarBtn = document.querySelector('#batallar')
let repartir = document.querySelector('#repartir')
let volver = document.querySelector('#volver')

//----- RESULTADO ------------------------------

// botones
let guardar = document.querySelector('#guardar')
let salir = document.querySelector('#salir')

// Campos a renombrar
let resultados = document.querySelectorAll('[data-type="card_resultado"]');
let resultadoMsg = document.querySelector('#resultMessage');
let resultOptions = document.querySelector('.result-options')

// res.children[0].children[0] Nombres
// res.children[0].children[1] pokemons img

// variables

let cartas

// comienzo juego

startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (pj1.value != '' && pj2.value!= '') {
        home.classList.add('d-none');
        loadingPage.classList.remove('d-none')
    }
    // timing para la pantalla de carga
    setTimeout(()=>{
        loadingPage.classList.add('d-none')
        showCards.classList.remove('d-none')
    }, 3000)
    // para seleccionar los pokemons de un listado


    cartas = repartirCards(); // array de cards
    updateCards(cartas)


    // pj1.value = '';
    // pj2.value = '';

})

closeBtn.addEventListener('click', (e) => {
    showCards.classList.add('d-none');
    gamePlay.classList.remove('d-none');
})


batallarBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    gamePlay.classList.add('d-none')
    gameResult.classList.remove('d-none')
    let victorias = batallar(cartas)
    updateResult(cartas,victorias)
})

repartir.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // visualizacion
    gamePlay.classList.add('d-none')
    loadingPage.classList.remove('d-none')
    // animacion
    setTimeout(()=>{
        loadingPage.classList.add('d-none')
        showCards.classList.remove('d-none')
    }, 3000)
    // logica
    cartas = repartirCards(); // array de cards
    updateCards(cartas)

    // volver el carousel a la carta inicial
    resetCarousel();


})

volver.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    gamePlay.classList.add('d-none')
    home.classList.remove('d-none')

    // volver el carousel a la carta inicial
    resetCarousel();
})


guardar.addEventListener('click', () => {
    gameResult.classList.add('d-none')
    home.classList.remove('d-none')
    let partida = gameResult.cloneNode(true);
    partida.removeChild(partida.children[3])
    pGuardadasElem.push([partida.innerHTML])
    contadorPartidas++
    // solo se muestran las partidas guardadas si efectivamente hay
    if (pGuardadasElem.length != 0) {
        pGuardadas.classList.remove('d-none')
        pGuardadasLista.innerHTML += `<li class="ps-3 pt-1" data-index = "${contadorPartidas}">${pj1.value} vs ${pj2.value}</li>`
    }
    // vaciamos la pantalla final
    resultados.forEach(resultado => {
        resultado.innerHTML = '';
    })
    resetCarousel()
})


salir.addEventListener('click', () => {
    gameResult.classList.add('d-none')
    home.classList.remove('d-none')
    resultados.forEach(resultado => {
        resultado.innerHTML = '';
    })
})

pGuardadasLista.addEventListener('click', (e)=>{
    let targetElement = e.target;
    let selector = 'li';
    while(targetElement != null) {
        if(targetElement.matches(selector)){
            console.log(pGuardadasElem)
            mostrarPartidaGuardada(pGuardadasElem, targetElement.dataset.index)
            return;
            }
        targetElement = targetElement.parentElement
    }
}, true )


function repartirCards() {
    // array de random para elegir cartas
    let arr = [];
    while(arr.length < 6){
        let r = Math.ceil(Math.random() * (pokemons.length - 1));
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    let pokemonList = [];
    arr.forEach((i) => {
        pokemonList.push(pokemons[i])
    })
    return pokemonList;

}

function updateCards(cartas) {
    cards.forEach((card,i) => {
        // nombres
        if (i <= 2) {
            card.children[0].children[0].textContent = pj1.value.toUpperCase();
        } else {card.children[0].children[0].textContent = pj2.value.toUpperCase();}
        // pokemon nombre
        card.children[2].children[0].textContent = cartas[i]['nombre'].toUpperCase()
        // imagen
        card.children[1].children[0].setAttribute('src', cartas[i]['img'])
        // descripcion
        card.children[3].children[0].textContent = cartas[i]['descripcion']

    })
}

function batallar(cartas) {
    let victorias = [];
    for (let i = 0; i < 3; i++) {
        let pokemon1 = cartas[i];
        let pokemon2 = cartas[i + 3];
        if (
            (pokemon1['debilidad'].indexOf(pokemon2['tipo']) == -1 && 
            pokemon2['debilidad'].indexOf(pokemon1['tipo']) == -1) || 
            (pokemon1['debilidad'].indexOf(pokemon2['tipo']) != -1 && 
            pokemon2['debilidad'].indexOf(pokemon1['tipo']) != -1)
            ) {
            if (Math.round(Math.random()) == 1) {
                victorias.push(1);
            } else  {victorias.push(0)}
        } else if (pokemon1['debilidad'].indexOf(pokemon2['tipo']) != -1) 
            {victorias.push(0)
        } else if (pokemon2['debilidad'].indexOf(pokemon1['tipo']) != -1) {
            victorias.push(1)
        }
    } return victorias;
}

function updateResult(cartas,victorias) {
    let resultadoMatch = [];
    victorias.forEach(match => {
        if (match == 1) {
            resultadoMatch.push('');
            resultadoMatch.push('defeated')
        } else if (match == 0) {
            resultadoMatch.push('defeated')
            resultadoMatch.push('');
        }
    })

    resultados.forEach((resultado, i) => {
        if (i == 0) {
            resultado.innerHTML += `<div id="resultPlayerOneName">
            <p class="fs-2 fw-bold text-center">${pj1.value}</p>
            </div>
            <div id="pokemonPlayerOne" class="d-flex justify-content-around">
                <div class="${resultadoMatch[0]}"><img src="${cartas[0]['img']}" alt=""></div>
                <div class="${resultadoMatch[2]}"><img src="${cartas[1]['img']}" alt=""></div>
                <div class="${resultadoMatch[4]}"><img src="${cartas[2]['img']}" alt=""></div>
            </div>
            </div>`;
        } else {
            resultado.innerHTML += `<div id="resultPlayerTwoName"><p class="fs-2 fw-bold text-center">${pj2.value}</p></div>
            <div id="pokemonPlayerTwo" class="d-flex justify-content-around">
                <div class="${resultadoMatch[1]}"><img src="img/bellsprout.png" alt="${cartas[3]['img']}"></div>
                <div class="${resultadoMatch[3]}"><img src="${cartas[4]['img']}" alt=""></div>
                <div class="${resultadoMatch[5]}"><img src="${cartas[5]['img']}" alt=""></div>
            </div>
            </div>`
        }
    })

    let a = victorias.reduce((acu,match) => {
        return acu+=match
    },0)
    if (a >= 2) {
        resultadoMsg.innerHTML = `<p class="fs-1 text-center w-75 lh-sm">Luego de una intensa batalla ${pj1.value} ha vencido a ${pj2.value}!</p>`
    } else {
        resultadoMsg.innerHTML = `<p class="fs-1 text-center w-75 lh-sm">Luego de una intensa batalla ${pj2.value} ha vencido a ${pj1.value}!</p>`
    }

}

function resetCarousel() {
    document.querySelectorAll('.carousel-item').forEach((item, i) => {
        if (i == 0) {
            item.classList.add('active')
        } else {item.classList.remove('active')}   
    })

    document.querySelectorAll('.carousel-indicators button').forEach((item, i) => {
        if (i == 0) {
            item.classList.add('active')
        } else {item.classList.remove('active')}   
    })

}

function mostrarPartidaGuardada(pGuardadasElem,idx) {
    home.classList.add('d-none')
    gameSaved.classList.remove('d-none')
    let botonSalir =  gameSaved.innerHTML
    gameSaved.innerHTML = pGuardadasElem[idx-1] + botonSalir;
    gameSaved.querySelector('.result-options button').addEventListener('click',() => {
        gameSaved.classList.add('d-none')
        home.classList.remove('d-none') 
        gameSaved.innerHTML = `<div class="result-options mt-4">
        <button id="salirPartidaGuardada" class="result-btn exit ms-3">
            <p class="fs-1 text-center m-0 text-white">Salir</p>
        </button>
    </div>`
    })
}