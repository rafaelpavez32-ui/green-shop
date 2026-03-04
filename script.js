let carrito = [];

// 1. Lógica del Carrito
const agregarAlCarrito = (nombre, precio) => {
  // Usamos un objeto simple para el carrito
  carrito.push({ id: Date.now(), nombre, precio });
  actualizarCarritoUI();
};

const actualizarCarritoUI = () => {
  const contador = document.querySelector("#carrito-count"); // Usamos el ID del nuevo HTML
  const lista = document.querySelector("#lista-carrito");
  const totalElemento = document.querySelector("#total-precio");

  // Actualizar el número del icono
  contador.textContent = carrito.length;
  contador.classList.add("animar");
  setTimeout(() => contador.classList.remove("animar"), 300);

  // Limpiar y rellenar la lista visual del carrito
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - ${item.precio}€
      <button onclick="eliminarDelCarrito(${index})" style="margin-left:10px; background:#ff4444; color:white; border:none; border-radius:3px; cursor:pointer;">X</button>
    `;
    lista.appendChild(li);
  });

  totalElemento.textContent = total;
};

// Función global para eliminar (necesaria para el onclick)
window.eliminarDelCarrito = (index) => {
  carrito.splice(index, 1);
  actualizarCarritoUI();
};

// 2. Inicializar Eventos de Compra
const inicializarCarrito = () => {
  document.querySelectorAll(".btn-carrito").forEach(boton => {
    boton.addEventListener("click", () => {
      // Extraemos los datos de los atributos data- que pusimos en el HTML (más seguro)
      const nombre = boton.dataset.nombre;
      const precio = parseFloat(boton.dataset.precio);
      agregarAlCarrito(nombre, precio);
    });
  });

  // Mostrar/Ocultar el carrito al pulsar el icono
  document.querySelector("#boton-carrito").addEventListener("click", () => {
    document.querySelector("#carrito-panel").classList.toggle("carrito-visible");
  });
};

// 3. Filtros (Este código estaba perfecto, solo lo mantenemos)
const filtrarProductos = categoria => {
  document.querySelectorAll(".planta").forEach(planta => {
    planta.classList.toggle(
      "hidden",
      categoria !== "todas" && planta.dataset.categoria !== categoria
    );
  });
};

const inicializarFiltros = () => {
  document.querySelectorAll(".filtro-btn").forEach(boton => {
    boton.addEventListener("click", () => {
      document.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("active"));
      boton.classList.add("active");
      filtrarProductos(boton.dataset.categoria);
    });
  });
};

// 4. Formulario con validación manual (Muy bien para DAW)
const inicializarFormulario = () => {
  const form = document.querySelector("#formulario-contacto");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    
    const nombre = document.querySelector("#nombre").value.trim();
    const email = document.querySelector("#email").value.trim();
    const mensaje = document.querySelector("#mensaje").value.trim();
    
    if (nombre.length < 3 || !email.includes("@") || mensaje.length < 10) {
      alert("❌ Por favor, completa los campos correctamente (nombre mín. 3 caracteres, mensaje mín. 10)");
      return;
    }
    
    alert(`✅ ¡Gracias ${nombre}! Tu mensaje ha sido enviado.`);
    form.reset();
  });
};

// 5. Botón Vaciar Carrito
const inicializarBotonesExtra = () => {
    document.querySelector("#vaciar-carrito").addEventListener("click", () => {
        carrito = [];
        actualizarCarritoUI();
    });
}

// Carga inicial
window.addEventListener("DOMContentLoaded", () => {
  inicializarCarrito();
  inicializarFiltros();
  inicializarFormulario();
  inicializarBotonesExtra();
});