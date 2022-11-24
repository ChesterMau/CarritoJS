// VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() { //cuando agregas un curso presionando boton
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

// FUNCIONES

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
    }
}

// eliminar curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter ( curso => curso.id !== cursoId );

        carritoHTML(); // Iterar sobre el carrito
     }
}


function leerDatosCursos(curso) { // leer contenido HTML
    const infoCurso = { //crear un objeto con el contenido 
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id); //revisa si un elemento ya existe en el carrito 
    if(existe) {
        const cursos=articulosCarrito.map(curso => { //actualizamos la cantidad
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna objeto actualizado
            } else {
                return curso; //retorna objetos que no son duplicados
            }
        }) 
        articulosCarrito = [...cursos];
    } else { 
        articulosCarrito = [...articulosCarrito, infoCurso];  //agregando elementos al arreglo del carrito -
    }

    console.log(articulosCarrito);
    carritoHTML(); //llamando html del carrito
}

function carritoHTML (){ //Muestra el carrito de compras en el HTML
    vaciarCarrito(); //limpiar html
    // recorre el carrito y genera html
    articulosCarrito.forEach ( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML=`
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `;
        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}


function vaciarCarrito () { //eliminar los cursos del tbody
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}


