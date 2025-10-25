const productos = [
  { id: 1, nombre: "Mouse", precio: 5000 },
  { id: 2, nombre: "Teclado", precio: 8000 },
  { id: 3, nombre: "Monitor", precio: 55000 }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");
const btnVaciar = document.getElementById("vaciarCarrito"); // <-- Esta línea define la variable

function renderProductos() {
  listaProductos.innerHTML = "";
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar</button>
    `;
    listaProductos.appendChild(div);
  });
}

function renderCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio} 
      <button onclick="eliminarDelCarrito(${index})">❌</button>
    `;
    listaCarrito.appendChild(li);
    total += item.precio;
  });
  totalCarrito.textContent = `Total: $${total}`;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  renderCarrito();

  Swal.fire({
    title: "¡Agregado!",
    text: `"${producto.nombre}" se agregó al carrito.`,
    icon: "success",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  renderCarrito();
}

// <-- Este bloque debe ir DESPUÉS de definir btnVaciar
btnVaciar.addEventListener("click", () => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡Se eliminarán todos los productos del carrito!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, vaciar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      renderCarrito();
      
      Swal.fire(
        '¡Carrito vacío!',
        'Tus productos fueron eliminados.',
        'success'
      );
    }
  });
});

renderProductos();
renderCarrito();