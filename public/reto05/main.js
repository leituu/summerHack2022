// ELEMENTOS

// BOTONES
let addBtn = document.getElementById('addBtn');
let addItem = document.getElementById('addItem');
let closeForm = document.getElementById('closeForm');

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


// LISTADO

let listadoTxt = '';

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
    listadoTxt += `<li class="item col-sm-10 col-md-5 mt-2 d-flex align-items-center">
                        <img class="mx-3" src="./img/${categoria.value}" alt="">
                        <div class="item-txt flex-grow-1"><p class="ms-1 mb-0">${titulo.value}</p></div>
                        <div class="item-desc visually-hidden">${descripcion.value}</div>
                        <div class="abrir-item mx-2"></div>
                    </li>`
    listado.innerHTML = listadoTxt
    form.reset();

})

document.addEventListener('click', (e) => {
    console.log(e.target);
})