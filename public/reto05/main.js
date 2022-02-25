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
let mostrarItemSection = document.getElementById('mostrarItemSection')
let listado = document.querySelector('#listadoSection ul')


// ELEMENTOS UTILES
let cardCont = document.getElementById('itemCard')

// VAARIABLES

let listadoTxt = '';
let cantItems = 0;

// LISTENERS

addBtn.addEventListener('click', () => {
    formSection.style.display = 'flex';
})

closeForm.addEventListener('click', () => {
    formSection.style.removeProperty("display");
})

addItem.addEventListener('click', (e) => {
    e.preventDefault();
    // validacion de campos
    if (titulo.value == '') {
        titulo.classList.add('invalid')
        titulo.placeholder = "Inserte un titulo por favor";
        return} else {titulo.classList.add('valid')}
        
    if (categoria.value == '') {
        categoria.classList.add('invalid')
        return} else {categoria.classList.add('valid')}

    // cambio de pantalla
    emptySection.style.display = 'none'
    // formSection.classList.add('visually-hidden')
    listadoSection.style.display = 'block';
    
    // inyeccion de item
    listadoTxt += `<li id="item-${cantItems}" class="item col-sm-10 col-md-5 mt-2 d-flex align-items-center">
                        <img class="mx-3" src="./img/${categoria.value}" alt="">
                        <div class="item-txt flex-grow-1"><p class="ms-1 mb-0">${titulo.value}</p></div>
                        <div class="item-desc visually-hidden">${descripcion.value}</div>
                        <div class="abrir-item mx-2"></div>
                    </li>`
    listado.innerHTML = listadoTxt
    cantItems++;
    // cerrar form
    // formSection.style.display = 'none';
    formSection.style.removeProperty('display')
    // Limpieza de clases de validacion
    titulo.classList.remove('invalid')
    categoria.classList.remove('invalid')
    titulo.classList.remove('valid')
    categoria.classList.remove('valid')
    form.reset();

})

closeCard.addEventListener('click', () => {
    mostrarItemSection.style.removeProperty('display');
    cardCont.removeChild(cardCont.children[1]);
})


// para abrir una carta
listadoSection.addEventListener('click', (e)=>{
    let targetElement = e.target;
    let selector = 'li';
    while(targetElement != null) {
    if(targetElement.matches(selector)){
        mostrarItem(targetElement)
        return;
        }
        targetElement = targetElement.parentElement
    }
}, true )

// FUNCIONES

function mostrarItem(itemId) {
    // crea el elemento que contiene la informacion del 
    mostrarItemSection.style.display = 'flex';
    let id = itemId.getAttribute('id');
    let item = document.getElementById(id).children
    let itemDesc = document.createElement('div');
    itemDesc.className = "d-flex flex-column align-items-center justify-content-start pt-2 px-3"
    itemDesc.innerHTML = `<img src="${item[0].getAttribute('src')}" class="mx-2" >
                            <div id=cardTitulo class="mt-1"><p class="m-0 fs-3 fw-bold text-center">${item[1].innerText}</p></div>
                            <div id=cardDesc class=""><p class="fs-5 text-center">${item[2].innerText}</p></div>`
    cardCont.appendChild(itemDesc);
}