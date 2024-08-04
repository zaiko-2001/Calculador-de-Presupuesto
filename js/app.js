const ingresos = [
    
];

const egresos = [
]

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
};

let totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
};

let totalEgresos = () => {
    let totalEgreso = 0;
    for (let egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
};

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById("presupuesto").innerHTML = formatoMonedas(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMonedas(totalIngresos());
    document.getElementById("egresos").innerHTML = formatoMonedas(totalEgresos());
};
const formatoMonedas = (valor)=>{
return valor.toLocaleString('es', {style:'currency', currency:'CLP', minimumFractionDigits:0})
}
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('es', {style:'percent', minimumFractionDigits:0})
}

 const cargarIngresos = ()=>{
    let ingresosHTML = '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML
 }
 
 const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento-descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento-valor">${formatoMonedas(ingreso.valor)}</div>
                        <div class="elemento-eliminar">
                            <button class="elemento-eliminar--btn">
                                <ion-icon class="ionblue" name="trash-outline" 
                                onclick="eliminarIngreso(${ingreso.id})"></ion-icon>

                            </button>
                        </div>
                    </div>
                 </div>
    `;
    return ingresoHTML
 }

const eliminarIngreso = (id)=>{
   let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id)
    ingresos.splice(indiceEliminar, 1)
    cargarCabecero()
    cargarIngresos()
}

 const cargarEgresos = ()=>{
    let egresosHTML = '';
    for (let egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML
 }
 
 const crearEgresoHTML = (egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento-descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento-valor">${formatoMonedas(egreso.valor)}</div>
                        <div class="elemento-porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                        <div class="elemento-eliminar">
                            <button class="elemento-eliminar--btn">
                                <ion-icon class="ionred" name="trash-outline" 
                                onclick="eliminarEgreso(${egreso.id})"></ion-icon>

                            </button>
                        </div>
                    </div>
                 </div>
    `;
    return egresoHTML
 }

 const eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id)
     egresos.splice(indiceEliminar, 1)
     cargarCabecero()
     cargarEgresos()
 }

 let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    
    if (descripcion.value !== '' && valor.value !== "") {
        if (tipo.value === 'ingreso') {
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        } else if (tipo.value === 'egreso') {
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
};
