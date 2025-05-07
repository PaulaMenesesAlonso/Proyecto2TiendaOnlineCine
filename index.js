const peliculas = [
  {
    id: 1,
    titulo: 'La la land',
    genero: 'Musical',
    año: 2016,
    precio: 8.99,
    imagen: 'assets/img/LaLaLand.jpg',
    destacada: false
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
    precio: 9.5,
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
    precio: 12.99,
    imagen: 'assets/img/ESDLA.jpg',
    destacada: true
  },
  {
    id: 9,
    titulo: 'West Side Story',
    genero: 'Musical',
    año: 1961,
    precio: 5.99,
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
  },
  {
    id: 11,
    titulo: 'Shrek',
    genero: 'Comedia',
    año: 2001,
    precio: 14.5,
    imagen: 'assets/img/Shrek.jpg',
    destacada: true
  },
  {
    id: 12,
    titulo: 'Superman',
    genero: 'Familiar',
    año: 1978,
    precio: 7.8,
    imagen: 'assets/img/Superman.jpg',
    destacada: false
  }
]
function prepararHeader() {
  const header = document.querySelector('header')

  const titulo = document.createElement('h1')
  titulo.textContent = 'Tu tienda de cine'
  header.appendChild(titulo)

  const botonesContainer = document.createElement('div')
  botonesContainer.className = 'header-buttons'
  header.appendChild(botonesContainer)

  window.botonesHeader = botonesContainer
}

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
  mostrarMensaje('✔️ Se ha agregado al carrito')
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

    const span = document.createElement('span')
    span.textContent = `${peli.titulo} - ${peli.precio.toFixed(2)} €`

    const btnEliminar = document.createElement('button')
    btnEliminar.textContent = 'Eliminar'

    btnEliminar.addEventListener('click', () => {
      carrito.splice(index, 1)
      actualizarCarrito()
      mostrarMensaje('❌ Se ha eliminado del carrito')
    })

    item.appendChild(span)
    item.appendChild(btnEliminar)
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
function crearModalFiltros() {
  const header = document.querySelector('header')

  const openFiltersBtn = document.createElement('button')
  openFiltersBtn.id = 'openFilters'
  openFiltersBtn.textContent = '🎛️ Filtros'

  const botonesContainer = window.botonesHeader

  if (!botonesContainer) {
    botonesContainer = document.createElement('div')
    botonesContainer.className = 'header-buttons'
    header.appendChild(botonesContainer)
  }
  botonesContainer.appendChild(openFiltersBtn)

  const modal = document.createElement('section')
  modal.id = 'modal'
  modal.className = 'modal oculto'

  const modalContenido = document.createElement('div')
  modalContenido.className = 'modal-contenido'

  const cerrarModal = document.createElement('span')
  cerrarModal.id = 'cerrarModal'
  cerrarModal.className = 'cerrar'
  cerrarModal.innerHTML = '&times;'

  const titulo = document.createElement('h2')
  titulo.textContent = 'Filtrar películas'

  const form = document.createElement('form')
  form.id = 'filtrosForm'

  const labelGenero = document.createElement('label')
  labelGenero.setAttribute('for', 'genero')
  labelGenero.textContent = 'Género:'

  const selectGenero = document.createElement('select')
  selectGenero.id = 'genero'

  const opcionesGenero = [
    { valor: '', texto: 'Todos' },
    { valor: 'Drama', texto: 'Drama' },
    { valor: 'Comedia', texto: 'Comedia' },
    { valor: 'Terror', texto: 'Terror' },
    { valor: 'Romance', texto: 'Romance' },
    { valor: 'Suspense', texto: 'Suspense' },
    { valor: 'Familiar', texto: 'Familiar' },
    { valor: 'Musical', texto: 'Musical' }
  ]

  opcionesGenero.forEach((opcionData) => {
    const option = document.createElement('option')
    option.value = opcionData.valor
    option.textContent = opcionData.texto
    selectGenero.appendChild(option)
  })

  const labelAño = document.createElement('label')
  labelAño.setAttribute('for', 'año')
  labelAño.textContent = 'Año:'

  const inputAño = document.createElement('input')
  inputAño.type = 'number'
  inputAño.id = 'año'
  inputAño.placeholder = 'Ej: 2001'

  const botonAplicar = document.createElement('button')
  botonAplicar.type = 'submit'
  botonAplicar.textContent = 'Aplicar filtros'

  const botonLimpiar = document.createElement('button')
  botonLimpiar.type = 'button'
  botonLimpiar.id = 'limpiarFiltros'
  botonLimpiar.textContent = 'Limpiar filtros'

  form.append(
    labelGenero,
    selectGenero,
    labelAño,
    inputAño,
    botonAplicar,
    botonLimpiar
  )

  modalContenido.append(cerrarModal, titulo, form)
  modal.appendChild(modalContenido)

  header.insertAdjacentElement('afterend', modal)

  window.modal = modal
  window.filtrosForm = form
  window.generoInput = selectGenero
  window.añoInput = inputAño
  window.limpiarBtn = botonLimpiar

  openFiltersBtn.addEventListener('click', () => {
    modal.classList.remove('oculto')
  })

  cerrarModal.addEventListener('click', () => {
    modal.classList.add('oculto')
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    modal.classList.add('oculto')
    aplicarFiltros()
  })

  limpiarBtn.addEventListener('click', () => {
    generoInput.value = ''
    añoInput.value = ''
    mostrarPeliculas(peliculas)
    modal.classList.add('oculto')
  })
}
function aplicarFiltros() {
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
      '<p class="mensaje-sugerencias">😕 No hay coincidencias. Aquí tienes algunas sugerencias:</p>'

    const sugeridas = peliculas
      .filter((p) => !p.destacada)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

    sugeridas.forEach((p) => crearTarjeta(p, contenedorProductos))
    mostrarMensaje('😕No hay coincidencias. Te mostramos algunas sugerencias.')
  }
}
function crearModalCarrito() {
  const header = document.querySelector('header')

  const btnCarrito = document.createElement('button')
  btnCarrito.id = 'openCarrito'
  btnCarrito.textContent = '🛒 Carrito '

  const contador = document.createElement('span')
  contador.id = 'contadorCarrito'
  contador.className = 'contador-badge'
  contador.textContent = '0'
  btnCarrito.appendChild(contador)

  const botonesContainer = window.botonesHeader
  if (!botonesContainer) {
    botonesContainer = document.createElement('div')
    botonesContainer.className = 'header-buttons'
    header.appendChild(botonesContainer)
  }
  botonesContainer.appendChild(btnCarrito)

  const modalCarrito = document.createElement('section')
  modalCarrito.id = 'carritoModal'
  modalCarrito.className = 'modal oculto'

  const contenido = document.createElement('div')
  contenido.className = 'modal-contenido'

  const cerrar = document.createElement('span')
  cerrar.id = 'cerrarCarrito'
  cerrar.className = 'cerrar'
  cerrar.innerHTML = '&times;'

  const titulo = document.createElement('h2')
  titulo.textContent = 'Tu carrito'

  const carritoContenido = document.createElement('div')
  carritoContenido.id = 'carritoContenido'

  const totalTexto = document.createElement('p')
  const strong = document.createElement('strong')
  strong.textContent = 'Total: '
  const totalCarrito = document.createElement('span')
  totalCarrito.id = 'totalCarrito'
  totalCarrito.textContent = '0.00 €'

  totalTexto.append(strong, totalCarrito)

  contenido.append(cerrar, titulo, carritoContenido, totalTexto)
  modalCarrito.appendChild(contenido)

  const modalFiltros = document.getElementById('modal')
  modalFiltros.insertAdjacentElement('afterend', modalCarrito)

  window.btnCarrito = btnCarrito
  window.modalCarrito = modalCarrito
  window.carritoContenido = carritoContenido
  window.totalCarrito = totalCarrito
  window.contadorCarrito = contador

  btnCarrito.addEventListener('click', () => {
    modalCarrito.classList.remove('oculto')
  })

  cerrar.addEventListener('click', () => {
    modalCarrito.classList.add('oculto')
  })
}

function crearSeccionPeliculasDestacadas() {
  const aside = document.createElement('aside')
  aside.id = 'peliculasDestacadas'

  const titulo = document.createElement('h2')
  titulo.textContent = 'Películas destacadas'

  const contenedorCarrusel = document.createElement('div')
  contenedorCarrusel.id = 'destacadasContainer'

  const controles = document.createElement('div')
  controles.className = 'controles-carrusel'

  const btnIzquierda = document.createElement('button')
  btnIzquierda.id = 'btnIzquierda'
  btnIzquierda.textContent = '◀️'

  const btnDerecha = document.createElement('button')
  btnDerecha.id = 'btnDerecha'
  btnDerecha.textContent = '▶️'

  controles.appendChild(btnIzquierda)
  controles.appendChild(btnDerecha)

  aside.appendChild(titulo)
  aside.appendChild(contenedorCarrusel)
  aside.appendChild(controles)

  document.body.appendChild(aside)

  window.contenedorDestacadas = contenedorCarrusel
  window.btnIzquierda = btnIzquierda
  window.btnDerecha = btnDerecha
}
function crearSeccionNuestrasPeliculas() {
  const main = document.createElement('main')
  main.id = 'nuestrasPeliculas'

  const titulo = document.createElement('h2')
  titulo.textContent = 'Nuestras películas'

  const contenedor = document.createElement('div')
  contenedor.id = 'productosContainer'

  main.appendChild(titulo)
  main.appendChild(contenedor)

  document.body.appendChild(main)

  window.contenedorProductos = contenedor
}

function crearMensajeFlotante() {
  const mensaje = document.createElement('div')
  mensaje.id = 'mensajeFlotante'
  document.body.appendChild(mensaje)
}

function mostrarMensaje(texto) {
  const mensaje = document.getElementById('mensajeFlotante')
  mensaje.textContent = texto
  mensaje.classList.add('mostrar')

  setTimeout(() => {
    mensaje.classList.remove('mostrar')
    mensaje.textContent = ''
  }, 3000)
}

let indiceCarrusel = 0
let cantidadVisible = calcularCantidadVisible()

const peliculasDestacadas = peliculas.filter((p) => p.destacada)

function calcularCantidadVisible() {
  const ancho = window.innerWidth

  if (ancho <= 610) return 1
  if (ancho <= 900) return 2
  return 3
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

window.addEventListener('resize', () => {
  const nuevaCantidad = calcularCantidadVisible()
  if (nuevaCantidad !== cantidadVisible) {
    cantidadVisible = nuevaCantidad
    indiceCarrusel = 0
    mostrarCarruselDestacadas()
  }
})

prepararHeader()
crearModalFiltros()
crearModalCarrito()
crearSeccionNuestrasPeliculas()
crearSeccionPeliculasDestacadas()
crearMensajeFlotante()

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
    indiceCarrusel = 0
  }
  mostrarCarruselDestacadas()
})

contenedorDestacadas.addEventListener('mouseenter', () => {
  clearInterval(autoCarrusel)
})

contenedorDestacadas.addEventListener('mouseleave', () => {
  iniciarAutoCarrusel()
})

mostrarCarruselDestacadas()
mostrarPeliculas(peliculas)
iniciarAutoCarrusel()
