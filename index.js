const peliculas = [
  {
    id: 1,
    titulo: 'La la land',
    genero: 'Musical',
    año: 2016,
    precio: 8.99,
    imagen: 'assets/img/LaLaLand.jpg',
    destacada: true
  },
  {
    id: 2,
    titulo: 'Pequeña Miss Sunshine',
    genero: 'Comedia',
    año: 2006,
    precio: 6.99,
    imagen: 'assets/img/PequeñaMS.jpg',
    destacada: true
  },
  {
    id: 3,
    titulo: 'El Exorcista',
    genero: 'Terror',
    año: 1973,
    precio: 9.99,
    imagen: 'assets/img/ElExorcista.jpg',
    destacada: false
  },
  {
    id: 4,
    titulo: 'La soga',
    genero: 'Suspense',
    año: 1948,
    precio: 10.99,
    imagen: 'assets/img/LaSoga.jpg',
    destacada: true
  },
  {
    id: 5,
    titulo: 'Jumanji',
    genero: 'Familiar',
    año: 1995,
    precio: 5.99,
    imagen: 'assets/img/Jumanji.jpg',
    destacada: false
  },
  {
    id: 6,
    titulo: 'Contratiempo',
    genero: 'Suspense',
    año: 2016,
    precio: 11.99,
    imagen: 'assets/img/Contratiempo.jpg',
    destacada: false
  },
  {
    id: 7,
    titulo: 'Orgullo y Prejuicio',
    genero: 'Romance',
    año: 2005,
    precio: 6.49,
    imagen: 'assets/img/OrgulloyPrejuicio.jpg',
    destacada: true
  },
  {
    id: 8,
    titulo: 'El señor de los anillos',
    genero: 'Drama',
    año: 2001,
    precio: 11.99,
    imagen: 'assets/img/ESDLA.jpg',
    destacada: true
  },
  {
    id: 9,
    titulo: 'West Side Story',
    genero: 'Musical',
    año: 1961,
    precio: 11.99,
    imagen: 'assets/img/WSS.jpg',
    destacada: false
  },
  {
    id: 10,
    titulo: 'Casablanca',
    genero: 'Drama',
    año: 1942,
    precio: 11.99,
    imagen: 'assets/img/Casablanca.jpg',
    destacada: true
  }
]

// DOM
const contenedorProductos = document.getElementById('productosContainer')
const contenedorDestacadas = document.getElementById('destacadasContainer')
const filtrosForm = document.getElementById('filtrosForm')
const generoInput = document.getElementById('genero')
const añoInput = document.getElementById('año')
const limpiarBtn = document.getElementById('limpiarFiltros')

const modal = document.getElementById('modal')
const openFiltersBtn = document.getElementById('openFilters')
const cerrarModal = document.getElementById('cerrarModal')

const btnCarrito = document.getElementById('openCarrito')
const modalCarrito = document.getElementById('carritoModal')
const cerrarCarrito = document.getElementById('cerrarCarrito')
const carritoContenido = document.getElementById('carritoContenido')
const contadorCarrito = document.getElementById('contadorCarrito')
const totalCarrito = document.getElementById('totalCarrito')

const btnIzquierda = document.getElementById('btnIzquierda')
const btnDerecha = document.getElementById('btnDerecha')

// Carrito
let carrito = []

function crearTarjeta(pelicula, contenedor, claseExtra = '') {
  const tarjeta = document.createElement('div')
  tarjeta.classList.add('card')
  if (claseExtra) tarjeta.classList.add(claseExtra)

  tarjeta.innerHTML = `
    <img src="${pelicula.imagen}" alt="${pelicula.titulo}">
    <div class="info">
      <h3>${pelicula.titulo}</h3>
      <p><strong>Género:</strong> ${pelicula.genero}</p>
      <p><strong>Año:</strong> ${pelicula.año}</p>
      <p><strong>Precio:</strong> ${pelicula.precio.toFixed(2)} €</p>
      <button class="btn-carrito" data-id="${
        pelicula.id
      }">Añadir al carrito</button>
    </div>
  `

  contenedor.appendChild(tarjeta)

  const btnAgregar = tarjeta.querySelector('.btn-carrito')
  btnAgregar.addEventListener('click', () => agregarAlCarrito(pelicula.id))
}

function agregarAlCarrito(id) {
  const peliSeleccionada = peliculas.find((p) => p.id === id)
  carrito.push(peliSeleccionada)
  actualizarCarrito()
  alert(`🎬 "${peliSeleccionada.titulo}" añadida al carrito`)
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1)
  actualizarCarrito()
}

function actualizarCarrito() {
  carritoContenido.innerHTML = ''

  carrito.forEach((peli, index) => {
    const item = document.createElement('div')
    item.classList.add('carrito-item')

    item.innerHTML = `
      <span>${peli.titulo} - ${peli.precio.toFixed(2)} €</span>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `

    carritoContenido.appendChild(item)
  })

  contadorCarrito.textContent = carrito.length
  const total = carrito.reduce((sum, peli) => sum + peli.precio, 0)
  totalCarrito.textContent = total.toFixed(2) + ' €'
}

function mostrarPeliculas(lista) {
  contenedorProductos.innerHTML = ''
  lista.forEach((peli) => crearTarjeta(peli, contenedorProductos))
}

let indiceCarrusel = 0
let cantidadVisible = calcularCantidadVisible()

const peliculasDestacadas = peliculas.filter((p) => p.destacada)

function calcularCantidadVisible() {
  const ancho = window.innerWidth

  if (ancho <= 600) return 1 // móvil
  if (ancho <= 900) return 2 // tablet
  return 3 // ordenador
}

function mostrarCarruselDestacadas() {
  contenedorDestacadas.innerHTML = ''

  const visibles = peliculasDestacadas.slice(
    indiceCarrusel,
    indiceCarrusel + cantidadVisible
  )

  visibles.forEach((peli) =>
    crearTarjeta(peli, contenedorDestacadas, 'destacada')
  )
}

btnIzquierda.addEventListener('click', () => {
  if (indiceCarrusel - cantidadVisible >= 0) {
    indiceCarrusel -= cantidadVisible
  } else {
    indiceCarrusel = 0
  }
  mostrarCarruselDestacadas()
})

btnDerecha.addEventListener('click', () => {
  if (indiceCarrusel + cantidadVisible < peliculasDestacadas.length) {
    indiceCarrusel += cantidadVisible
  } else {
    indiceCarrusel = 0 // volver al principio si ya estamos al final
  }
  mostrarCarruselDestacadas()
})

// Auto carrusel adaptado
let autoCarrusel
function iniciarAutoCarrusel() {
  clearInterval(autoCarrusel)
  autoCarrusel = setInterval(() => {
    if (indiceCarrusel + cantidadVisible < peliculasDestacadas.length) {
      indiceCarrusel += cantidadVisible
    } else {
      indiceCarrusel = 0
    }
    mostrarCarruselDestacadas()
  }, 5000)
}

contenedorDestacadas.addEventListener('mouseenter', () => {
  clearInterval(autoCarrusel)
})
contenedorDestacadas.addEventListener('mouseleave', () => {
  iniciarAutoCarrusel()
})

// Detectar cambio de tamaño de pantalla y actualizar
window.addEventListener('resize', () => {
  const nuevaCantidad = calcularCantidadVisible()
  if (nuevaCantidad !== cantidadVisible) {
    cantidadVisible = nuevaCantidad
    indiceCarrusel = 0 // reiniciamos el índice
    mostrarCarruselDestacadas()
  }
})

// Pausar al hacer hover
contenedorDestacadas.addEventListener('mouseenter', () => {
  clearInterval(autoCarrusel)
})

contenedorDestacadas.addEventListener('mouseleave', () => {
  iniciarAutoCarrusel()
})

// Iniciar al cargar
iniciarAutoCarrusel()

// Filtros
filtrosForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const genero = generoInput.value
  const año = parseInt(añoInput.value)

  let filtradas = peliculas.filter((p) => {
    const cumpleGenero = genero ? p.genero === genero : true
    const cumpleAño = año ? p.año === año : true
    return cumpleGenero && cumpleAño
  })

  if (filtradas.length > 0) {
    mostrarPeliculas(filtradas)
  } else {
    contenedorProductos.innerHTML =
      '<p>No hay coincidencias. Aquí tienes algunas sugerencias:</p>'
    const sugeridas = peliculas
      .filter((p) => !p.destacada)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
    sugeridas.forEach((p) => crearTarjeta(p, contenedorProductos))
  }
  modal.classList.add('oculto')
})

limpiarBtn.addEventListener('click', () => {
  generoInput.value = ''
  añoInput.value = ''
  mostrarPeliculas(peliculas)
  modal.classList.add('oculto')
})

// Modales
openFiltersBtn.addEventListener('click', () => {
  modal.classList.remove('oculto')
})

cerrarModal.addEventListener('click', () => {
  modal.classList.add('oculto')
})

btnCarrito.addEventListener('click', () => {
  modalCarrito.classList.remove('oculto')
})

cerrarCarrito.addEventListener('click', () => {
  modalCarrito.classList.add('oculto')
})

// Inicialización
mostrarCarruselDestacadas()
mostrarPeliculas(peliculas)

// Exportar para el botón de eliminar
window.eliminarDelCarrito = eliminarDelCarrito
