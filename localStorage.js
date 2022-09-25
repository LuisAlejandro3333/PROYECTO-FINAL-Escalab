const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaBusquedas');
let arrayBusquedas = [];


const CrearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: true
    }
    arrayBusquedas.push(item); 
    return item;
}

const guardarDB = (actividad) => {
    localStorage.setItem('busqueda', JSON.stringify(arrayBusquedas));
    PintarDB();
}
const PintarDB = () => {
        listaActividadesUI.innerHTML = '';
        arrayBusquedas = JSON.parse(localStorage.getItem('busqueda'));
        if (arrayBusquedas.length > 3) {
            arrayBusquedas.shift(); 
        }
        if (arrayBusquedas === null) {
            arrayBusquedas = [];
        } else {
            arrayBusquedas.forEach(Element => {
                listaActividadesUI.innerHTML += `
            <div>
            <b class="clickeable" onclick="enviarValor('${Element.actividad}')">${Element.actividad}</b>
            </div>`
            });
        }
    }


formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let actividadUI = document.getElementById('search').value;
    CrearItem(actividadUI);
    guardarDB();
    formularioUI.reset();
});


document.addEventListener('DOMContentLoaded', PintarDB);
