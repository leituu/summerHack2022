// ELEMENTOS

// BOTONES
let addBtn = document.getElementById('addBtn');
let addItem = document.getElementById('addItem');
let closeForm = document.getElementById('closeForm');
let closeCard = document.getElementById('closeCardBtn')

// INPUTS
let form = document.getElementById('form')
let titulo = document.getElementById('titulo')
let categoria = document.getElementById('categoria')
let descripcion = document.getElementById('descripcion')

// SECCIONES
let emptySection = document.getElementById('emptySection')
let formSection = document.getElementById('formSection')
let listadoSection = document.getElementById('listadoSection')
let listado = document.querySelector('#listadoSection ul')
let mostrarItemSection = document.getElementById('mostrarItemSection')

// ELEMENTOS UTILES
let cardCont = document.getElementById('itemCard')

// VAARIABLES

let listadoTxt = '';
let cantItems = 0;

// LISTENERS

addBtn.addEventListener('click', () => {
    formSection.classList.remove('visually-hidden');
})

closeForm.addEventListener('click', () => {
    formSection.classList.add('visually-hidden');
})

addItem.addEventListener('click', (e) => {
    e.preventDefault();
    emptySection.classList.add('visually-hidden')
    formSection.classList.add('visually-hidden')
    listadoSection.classList.remove('visually-hidden')
    listadoTxt += `<li id="item-${cantItems}" class="item col-sm-10 col-md-5 mt-2 d-flex align-items-center">
                        <img class="mx-3" src="./img/${categoria.value}" alt="">
                        <div class="item-txt flex-grow-1"><p class="ms-1 mb-0">${titulo.value}</p></div>
                        <div class="item-desc visually-hidden">${descripcion.value}</div>
                        <div class="abrir-item mx-2"></div>
                    </li>`
    listado.innerHTML = listadoTxt
    cantItems++;
    form.reset();

})

closeCard.addEventListener('click', () => {
    mostrarItemSection.classList.add('visually-hidden');
    // console.log(cardCont.children)
    cardCont.removeChild(cardCont.children[1])
    // cardCont.removeChild(cardCont.children[2])
})


// para abrir una carta
document.addEventListener('click', (e) => {
    let elementoId;
    if (e.target.tagName == 'P') {
        elementoId = e.target.parentNode.parentNode;
    } else if (e.target.tagName == 'DIV') {
        elementoId = e.target.parentNode;
    } else if (e.target.tagName == 'IMG') {
        elementoId = e.target.parentNode;
    } else if (e.target.tagName == 'LI') {
        elementoId = e.target;
    };
    let elemTag = elementoId.tagName;
    if(elemTag == 'LI'){
        mostrarItem(elementoId)
    }
})


// FUNCIONES

function mostrarItem(itemId) {
    // crea el elemento que contiene la informacion del 
    mostrarItemSection.classList.remove('visually-hidden');
    let id = itemId.getAttribute('id');
    let item = document.getElementById(id).children
    let itemDesc = document.createElement('div');
    itemDesc.className = "d-flex flex-column align-items-start justify-content-start pt-2 ps-3"
    itemDesc.innerHTML = `  <img src="${item[0].getAttribute('src')}" class="mx-2" >
                            <div id=cardTitulo class="ps-3 mt-1"><p class="m-0 fs-3 fw-bold">${item[1].innerText}</p></div>
                            <div id=cardDesc class="ps-4"><p class="m-0 fs-5">${item[2].innerText}</p></div>`
    cardCont.appendChild(itemDesc);
}