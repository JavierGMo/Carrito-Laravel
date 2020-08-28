const sendData = async function(URL, data, token){
    const resp = await fetch(URL, {
        headers : {
            'X-CSRF-TOKEN' : token
        },
        method : 'POST',
        body : data
    });
    const result = resp;
    return result;

};

document.addEventListener('DOMContentLoaded', function(){
    let moverAPerfil = document.getElementById('mueve-perfil');
    let moverAVender = document.getElementById('mueve-vender');
    let moverACompras = document.getElementById('mueve-compras');
    let moverACambiarContra = document.getElementById('mueve-cambiar-contra');
    let moverAEliminar = document.getElementById('mueve-eiliminar');
    /* Vender */
    let btnVender = document.getElementById('btn-vender');
    /* Cambiar contraseña */
    let bntCambioCont = document.getElementById('btn-cambio-contrasenia');
    /* Eliminar cuenta */
    let btnPreEliminar = document.getElementById('btn-pre-eliminar');
    
    /* Mostrar el form para eliminar */
    let btnEliminar = document.getElementById('btn-eliminar-cuenta');
    /* Contenedor para eliminar la cuenta */
    let formEliminarCuenta = document.getElementById('form-eliminar-cuenta');
    let confirmarMostrarForm = false;

    const contenedores = {
        'perfil' : document.getElementById('conte-perfil'),
        'vender' : document.getElementById('conte-vender'),
        'compras' : document.getElementById('conte-compras'),
        'cambio-contra' : document.getElementById('conte-cambio-contra'),
        'eliminar' : document.getElementById('conte-eliminar'),
    };

    let auxVisible = contenedores['perfil'];


    /* Listeners de opciones */

    moverAPerfil.addEventListener('click', function(e){
        e.preventDefault();
        auxVisible.classList.add('oculto');
        contenedores['perfil'].classList.remove('oculto');
        auxVisible = contenedores['perfil'];
        if(confirmarMostrarForm){
            formEliminarCuenta.classList.add('oculto');
            confirmarMostrarForm = false;
        }

    });
    moverAVender.addEventListener('click', function(e){
        e.preventDefault();
        auxVisible.classList.add('oculto');
        contenedores['vender'].classList.remove('oculto');
        auxVisible = contenedores['vender'];
        if(confirmarMostrarForm){
            formEliminarCuenta.classList.add('oculto');
            confirmarMostrarForm = false;
        }
    });
    moverACompras.addEventListener('click', function(e){
        e.preventDefault();
        auxVisible.classList.add('oculto');
        contenedores['compras'].classList.remove('oculto');
        auxVisible = contenedores['compras'];
        if(confirmarMostrarForm){
            formEliminarCuenta.classList.add('oculto');
            confirmarMostrarForm = false;
        }
    });
    moverACambiarContra.addEventListener('click', function(e){
        e.preventDefault();
        auxVisible.classList.add('oculto');
        contenedores['cambio-contra'].classList.remove('oculto');
        auxVisible = contenedores['cambio-contra'];
    });
    moverAEliminar.addEventListener('click', function(e){
        e.preventDefault();
        auxVisible.classList.add('oculto');
        contenedores['eliminar'].classList.remove('oculto');
        auxVisible = contenedores['eliminar'];
        if(confirmarMostrarForm){
            formEliminarCuenta.classList.add('oculto');
            confirmarMostrarForm = false;
        }
    });

    /* Lsiteners para vender, cambiar y eliminar */
    btnVender.addEventListener('click', function(e){
        e.preventDefault();
        const token = document.getElementById('token_producto');
        const imgProducto = document.getElementById('img_producto');
        const nombreProducto = document.getElementById('nombre_producto');
        const descripcionProducto = document.getElementById('descripcion_producto');
        const numeroPiezas = document.getElementById('numero_piezas_producto');
        const precioUnidad = document.getElementById('precio_unidad_producto');
        const data =  new FormData()
        console.log(imgProducto);
        data.append('img_producto', imgProducto.files[0]);
        data.append('nombre_producto', nombreProducto.value);
        data.append('descripcion_producto', descripcionProducto.value);
        data.append('numero_piezas_producto', numeroPiezas.value);
        data.append('precio_unidad_producto', precioUnidad.value);
        sendData('http://127.0.0.1:8000/product', data, token.value)
        .then(async function(res){
            const data = res;
            console.log(data);
        })
        .catch(function(e){
            console.error('Error: '+e);
        });
        
    });
    bntCambioCont.addEventListener('click', function(e){
        e.preventDefault();
        const nuevaContrasenia = document.getElementById('nueva-contrasenia');
        const confirmarNuevaContra = document.getElementById('confirmar-nueva-contrasenia');
        console.log(nuevaContrasenia.value);
    });

    btnPreEliminar.addEventListener('click', function(e){
        e.preventDefault();
        formEliminarCuenta.classList.remove('oculto');
        console.log('Pre');
        confirmarMostrarForm = true;

    });

    btnEliminar.addEventListener('click', function(e){
        e.preventDefault();
        const contrasenia = document.getElementById('contrasenia-para-borrar');
        console.log(contrasenia.value);

    });

});

