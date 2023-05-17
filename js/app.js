// Variables y selectores 
const  formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector("#gastos ul")



// Eventos

eventListeners()
function eventListeners(){
  document.addEventListener("DOMContentLoaded", preguntarPresupuesto)
  formulario.addEventListener("submit", agregarGasto)

}


// Clases
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto)
    this.restante = Number(presupuesto)
    this.gastos = []
  }
  nuevoGasto(gasto){
    this.gastos = [...this.gastos, gasto]
    console.log(this.gastos);
  }
}

class UI {
    insertarPresupuesto(cantidad){
      const { presupuesto, restante } = cantidad
      document.querySelector("#total").textContent = presupuesto
      document.querySelector("#restante").textContent = restante
    }
    imprimirAlerta(mensaje, tipo){
      // Crear el div 
      const divMensaje = document.createElement("div")
      divMensaje.classList.add("text-center", "alert")
      if(tipo==="error"){
        divMensaje.classList.add("alert-danger")
      }else{
        divMensaje.classList.add("alert-success")
      }
      // Mensaje de error
      divMensaje.textContent = mensaje
      // Insertar en el HTML
      document.querySelector(".primario").insertBefore(divMensaje, formulario)
      // Quitar mensaje
      setTimeout(() => {
        divMensaje.remove()
      }, 3000);
    }
    agregarGastoListado(gastos){
      this.limpiarHTML() //Elimina HTML previo
      // Iterar sobre los gastos 
      gastos.forEach(gasto => {
        const { cantidad, nombre, id } = gasto
        // Crear un LI
        const nuevoGasto = document.createElement("li")
        nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center'
        nuevoGasto.dataset.id = id
        // Agregar el gasto al HTML
        nuevoGasto.innerHTML = ` ${nombre} <span class="badge badge-primary badge-pill">${cantidad}</span>
        `
        // Boton de borrado
        const btnBorrar = document.createElement("button");
        btnBorrar.classList.add("btn", "btn-danger", "borrar-gasto")
        btnBorrar.innerHTML = "Borrar &times"
        nuevoGasto.appendChild(btnBorrar)
        // Agregar el boton al HTML
        gastoListado.appendChild(nuevoGasto)
      });
    }
      limpiarHTML ( ) {
      while(gastoListado.firstChild){
        gastoListado.removeChild(gastoListado.firstChild)
      }
      }

}

// Instanciar
const ui = new UI()
let presupuesto;
// Funciones

function preguntarPresupuesto(){
  const presupuestoUsuario = prompt("Cuál es tu presupuesto?")
  // console.log(Number(presupuestoUsuario));
  if(presupuestoUsuario === "" || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
    window.location.reload()
  }
  // Presupuesto valido
  presupuesto = new Presupuesto(presupuestoUsuario)


  ui.insertarPresupuesto(presupuesto)
}


// Añade gastos 
function agregarGasto(e){
  e.preventDefault()
  // Leer datos del formulario
  const nombre = document.querySelector("#gasto").value
  const cantidad = Number(document.querySelector("#cantidad").value)

  // Validar
  if(nombre === "" || cantidad === '') {
    ui.imprimirAlerta('Ambos campos son obligatorios', 'error')

     return //Return para que no se ejecuten las sig lineas
  }else if (cantidad <= 0 || isNaN(cantidad)){
    ui.imprimirAlerta('Cantidad no válida', "e9009000rror")
     
     return  //Return para que no se ejecuten las sig lineas
  }
  // Generar un objeto del tipo gasto 
  const gasto = {
    nombre,
    cantidad,
    id: Date.now()
  }
  presupuesto.nuevoGasto(gasto)
  // Mensaje exitoo
  ui.imprimirAlerta("Gasto agregado correctamente")
  // Imprimir los gastos 
  const { gastos } = presupuesto
  ui.agregarGastoListado(gastos)
  // Reinicio del formulario
  formulario.reset()
}