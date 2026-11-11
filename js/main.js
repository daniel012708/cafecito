// La clase permite ocultar el menú solo cuando JavaScript está disponible.
document.documentElement.classList.add('js');
const botonMenu = document.querySelector('.boton-menu');
const navegacion = document.querySelector('#navegacion');
function cerrarMenu() {
  navegacion.classList.remove('abierto');
  botonMenu.setAttribute('aria-expanded', 'false');
}
botonMenu.addEventListener('click', () => {
  const abierto = navegacion.classList.toggle('abierto');
  botonMenu.setAttribute('aria-expanded', String(abierto));
});
navegacion.querySelectorAll('a').forEach(enlace => {
  enlace.addEventListener('click', cerrarMenu);
});
document.addEventListener('keydown', evento => {
  if (evento.key === 'Escape' && navegacion.classList.contains('abierto')) {
    cerrarMenu();
    botonMenu.focus();
  }
});
window.matchMedia('(min-width: 900px)').addEventListener('change', cerrarMenu);

// Filtrado local: no hay consultas a un servidor.
const filtros = document.querySelectorAll('.filtro');
const productos = document.querySelectorAll('.producto');
filtros.forEach(boton => {
  boton.addEventListener('click', () => {
    filtros.forEach(filtro => {
      const seleccionado = filtro === boton;
      filtro.classList.toggle('activo', seleccionado);
      filtro.setAttribute('aria-pressed', String(seleccionado));
    });
    let visibles = 0;
    productos.forEach(producto => {
      producto.hidden = boton.dataset.categoria !== 'todos' && producto.dataset.tipo !== boton.dataset.categoria;
      if (!producto.hidden) visibles++;
    });
    document.querySelector('#estado-filtro').textContent = `${visibles} productos en esta categoría.`;
  });
});

const formulario = document.querySelector('#formulario');
formulario.addEventListener('submit', evento => {
  evento.preventDefault();
  const nombre = formulario.elements.nombre.value.trim();
  const mensaje = formulario.elements.mensaje.value.trim();
  const respuesta = document.querySelector('#respuesta');
  if (!nombre || mensaje.length < 10) {
    respuesta.textContent = 'Escribe tu nombre y un mensaje de al menos 10 caracteres, sin contar espacios al inicio o al final.';
    (!nombre ? formulario.elements.nombre : formulario.elements.mensaje).focus();
    return;
  }
  // textContent evita interpretar como HTML el texto ingresado.
  respuesta.textContent = `Gracias, ${nombre}. Los campos son válidos. Esta es una prueba: el mensaje no se envió ni se guardó.`;
  formulario.reset();
});
