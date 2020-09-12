
const sendData = async function(URL, data, method, headers){
    const resp = await fetch(URL, {
        headers : headers,
        method : method,
        body : data
    });
    const result = resp;
    return result;

};
const receiveData = async function(URL, data){
    const resp = await fetch(URL, {
        method : 'GET',
        body : data
    });
    const result = resp;
    return result;
}

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
    let mostrarBorraCuenta = false;
    
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
            mostrarBorraCuenta = false;
            console.log(mostrarBorraCuenta);
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
            mostrarBorraCuenta = false;
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
            mostrarBorraCuenta = false;
        }
    });
    moverACambiarContra.addEventListener('click', function(e){
        e.preventDefault();
        auxVisible.classList.add('oculto');
        contenedores['cambio-contra'].classList.remove('oculto');
        auxVisible = contenedores['cambio-contra'];
        if(confirmarMostrarForm){
            formEliminarCuenta.classList.add('oculto');
            confirmarMostrarForm = false;
            mostrarBorraCuenta = false;
        }
    });
    moverAEliminar.addEventListener('click', function(e){
        e.preventDefault();
        auxVisible.classList.add('oculto');
        contenedores['eliminar'].classList.remove('oculto');
        auxVisible = contenedores['eliminar'];
        if(confirmarMostrarForm){
            formEliminarCuenta.classList.add('oculto');
            confirmarMostrarForm = false;
            mostrarBorraCuenta = false;
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
        if(
            imgProducto.files[0] === undefined && nombreProducto.value.trim() === '' && 
            descripcionProducto.value.trim()=== '' && numeroPiezas.value.trim() === ''
        ){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hace falta llenar los campos'
            });
            return;
        }

        const data =  new FormData()
        // console.log(imgProducto);
        data.append('ref_img', imgProducto.files[0]);
        data.append('name', nombreProducto.value);
        data.append('description', descripcionProducto.value);
        data.append('number_of_pieces', numeroPiezas.value);
        data.append('price', precioUnidad.value);
        sendData('http://127.0.0.1:8000/product', data, 'POST', {'X-CSRF-TOKEN' : token.value})
        .then(async function(res){
            const data = await res.text();
            // res.status
            // console.log('Data: ' +  data + ' status' + res.status);
            if(res.status === 200){
                // alert('Exito, se guardo tu producto');
                // console.log(`Response text: ${data}`);
                Swal.fire({
                    icon: 'success',
                    title: 'Listo',
                    text: 'Agrego su producto',
                    timer: 1750,
                    onClose: () => {
                        imgProducto.value = '';
                        nombreProducto.value = '';
                        descripcionProducto.value = '';
                        numeroPiezas.value = '';
                        precioUnidad.value = '';
                    }});
                
            }else if(res.status === 400){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salio mal, intente de nuevo.'
                });
            }
        })
        .catch(function(e){
            console.error(`Error: ${e}`);
        });
        
    });

    bntCambioCont.addEventListener('click', function(e){
        e.preventDefault();

        const token = document.getElementById('token_cambio_p');
        const id = document.getElementById('id_user_c_p');
        const nuevaContrasenia = document.getElementById('nueva-contrasenia');
        const confirmarNuevaContra = document.getElementById('confirmar-nueva-contrasenia');
        
        if(nuevaContrasenia.value.trim()==='' && confirmarNuevaContra.value.trim() === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Llene los campos :)'
            });
            return;
        }


        if(nuevaContrasenia.value === confirmarNuevaContra.value){
            const data = new URLSearchParams();
            data.append('password', nuevaContrasenia.value);
            Swal.fire({
                title: '¿Continuar?',
                text: "Su contraseña se cambiara",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#28a745',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, continuar',
                cancelButtonText:'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    sendData(`http://127.0.0.1:8000/userpanel/${id.value}`, data, 'PUT',{
                        'X-CSRF-TOKEN' : token.value,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                    .then(async function(res){
                        const data = await res.text();
                        if(res.status === 200){
                            Swal.fire({
                                icon: 'success',
                                title: 'Listo',
                                text: 'Cambio de contraseña con exito',
                                timer: 2000
                            });
                        }else if(res.status === 400){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Algo salio mal, intente de nuevo'
                            });
                        }
                    })
                    .catch(function(e){
                        console.error(e);
                    });
                }
            });
            
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Verifique que sean iguales'
            });
        }
        nuevaContrasenia.value = '';
        confirmarNuevaContra.value = '';
    });

    btnPreEliminar.addEventListener('click', function(e){
        e.preventDefault();
        if(mostrarBorraCuenta){
            return;
        }
        Swal.fire({
            title: '¿Continuar?',
            text: "Si continua tiene que verificar con su contraseña",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText:'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                formEliminarCuenta.classList.remove('oculto');
                // console.log('Pre');
                confirmarMostrarForm = true;
                mostrarBorraCuenta = true;
            }
        });
        

    });

    btnEliminar.addEventListener('click', function(e){
        e.preventDefault();
        const id = document.getElementById('id_delete');
        const token = document.getElementById('token_delete');
        const contrasenia = document.getElementById('contrasenia_para_borrar');

        if(contrasenia.value.trim() === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Llene los campos'
            });
            return;
        }

        const data = new URLSearchParams();
        data.append('password', contrasenia.value);
        Swal.fire({
            title: '¿Continuar?',
            text: "Su cuenta se borrara permanentemente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar',
            cancelButtonText:'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                    sendData(`http://127.0.0.1:8000/userpanel/${id.value}`,
                    data,
                    'DELETE',
                    {
                        'X-CSRF-TOKEN' : token.value,
                        // 'Content-Type' : 'application/x-www-form-urlencoded'
                    })
                    .then(async function(res){
                        const data = await res.text();
                        console.log(`Data: ${data}`);
                        if(res.status === 200){
                            Swal.fire({
                                icon: 'success',
                                title: 'Listo',
                                text: 'Cuenta borrada',
                                timer: 1750,
                                onClose: function(){
                                    window.location.href = 'http://127.0.0.1:8000';
                                }
                            });
                            
                        }else if(res.status === 400){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Algo salio mal, intente de nuevo'
                            });
                        }
                    })
                    .catch(function(e){
                        console.error(`Error: ${e}`);
                    });
            }
        });

        
    });

    //Traer todos los productos que se compraron


});

