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
                alert('Exito, se guardo tu producto');
                // console.log(`Response text: ${data}`);
                imgProducto.value = '';
                nombreProducto.value = '';
                descripcionProducto.value = '';
                numeroPiezas.value = '';
                precioUnidad.value = '';
            }else if(res.status === 400){
                alert('VAya, deberias checar tus campos, faltan algunos');
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
        
        if(nuevaContrasenia.value === confirmarNuevaContra.value){
            const data = new URLSearchParams();
            data.append('password', nuevaContrasenia.value);
        
            sendData(`http://127.0.0.1:8000/userpanel/${id.value}`, data, 'PUT',{
                'X-CSRF-TOKEN' : token.value,
                'Content-Type': 'application/x-www-form-urlencoded'
            })
            .then(async function(res){
                const data = await res.text();
                if(res.status === 200){
                    console.log(data);
                    alert('Se cambio correctamente');
                    nuevaContrasenia.value = '';
                    confirmarNuevaContra.value = '';
                }else if(res.status === 400){
                    alert('Vaya, intenta de nuevo');
                }
            })
            .catch(function(e){
                console.error(e);
            });
        }else{
            alert('Vaya, confirma las contraseñas');
        }
    });

    btnPreEliminar.addEventListener('click', function(e){
        e.preventDefault();
        formEliminarCuenta.classList.remove('oculto');
        console.log('Pre');
        confirmarMostrarForm = true;

    });

    btnEliminar.addEventListener('click', function(e){
        e.preventDefault();
        const id = document.getElementById('id_delete');
        const token = document.getElementById('token_delete');
        const contrasenia = document.getElementById('contrasenia_para_borrar');
        const data = new URLSearchParams();
        data.append('password', contrasenia.value);
        console.log(contrasenia.value);

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
                alert('Cuenta borrada');
                window.location.href = 'http://127.0.0.1:8000';
            }else if(res.status === 400){
                alert('Vaya, verifica tu campo');
            }
        })
        .catch(function(e){
            console.error(`Error: ${e}`);
        });
    });

    //Traer todos los productos que se compraron


});

