
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
function editProduct(este, id){
    // console.log(este);
    console.log(`ID : ${id}`);
    const formInjection = document.getElementById('form-injection');
    // console.log(formInjection);
    let template = '';
    receiveData(`http://127.0.0.1:8000/soldproducts/${id}`, null).then(async function(res){
        const respuesta = await res.json();
        const data = respuesta['data'];
        console.log(data);
        template = `
            <p>${data[0]['id']}</p>
            
            <input id="name-update" value="${data[0]['name']}" >
            <textarea id="description-update" >
                ${data[0]['description']}
            </textarea>
            <input id="number-of-pieces-update" value="${data[0]['number_of_pieces']}">
            <input id="price-update" value="${data[0]['price']}">
        `;
        formInjection.innerHTML = template;

    }).catch(e=>console.error(e));

    //Con esto remplazo lo que hay en el container para el form
    //Solo debo de dar los mismos id para los input e injectar en el form los inputs
}
function deleteProduct(este, id){
    const token = document.getElementById('token-update-products');
    sendData(`http://127.0.0.1:8000/soldproducts/${id}`, null, 'DELETE', {
        'X-CSRF-TOKEN' : token.value,
    }).then(async function(res){
        const respuesta = await res.json();
        const data = respuesta['data'];

        if(res.status === 200 && data === 1){
            Swal.fire({
                icon: 'success',
                title: 'Borrado',
                text: 'Producto borrado'
            });
        }

    }).catch(e=>console.error(e));
}

document.addEventListener('DOMContentLoaded', function(){
    let moverAPerfil = document.getElementById('mueve-perfil');
    let moverAVender = document.getElementById('mueve-vender');
    let moverAVendidos = document.getElementById('mueve-vendidos');
    let moverACompras = document.getElementById('mueve-compras');
    let moverACambiarContra = document.getElementById('mueve-cambiar-contra');
    let moverAEliminar = document.getElementById('mueve-eiliminar');
    /* Vender */
    let btnVender = document.getElementById('btn-vender');
    /* Compras-Tabla */
    let comprasTable = document.getElementById('compras-table');
    /* Ventas-Tabla */
    let vendidosTabla = document.getElementById('sold-table');
    let btnUpdateProduct = document.getElementById('update-product');
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
        'vendidos' : document.getElementById('conte-vendidos'),
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
    moverAVendidos.addEventListener('click', function(e){
        e.preventDefault();
        auxVisible.classList.add('oculto');
        contenedores['vendidos'].classList.remove('oculto');
        auxVisible = contenedores['vendidos'];
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
   
   
   btnUpdateProduct.addEventListener('click', function(e){
       e.preventDefault();

   });
    //Productos vendidos
    setTimeout(function(){
        receiveData('http://127.0.0.1:8000/soldproducts',null)
        .then(async function(res){
            const respuesta = await res.json();
            const data = respuesta['data'];
            // console.log(data);
            const options = {
                numberPerPage : 5,
                goBar : false,
                pageCounter : true
            };
            const filterOptions = {
                el : '#searchSold'
            };
            for (const key in data) {
                const template = `
                    <tr>
                        <td>${parseInt(key)+1}</td>
                        <td>${data[key]['name']}</td>
                        <td><p class="field-descriptions truncate">${data[key]['description']}</p></td>
                        <td>${data[key]['number_of_pieces']}</td>
                        <td>$${data[key]['price']}</td>
                        <td><a class="icons-sold" href="javascript:void(0);" onclick="editProduct(this, ${data[key]['id']})"><span class="s-incos-sold"><i class="fa fa-edit"></i></a></span></td>
                        <td><a class="icons-sold" href="javascript:void(0);" onclick="deleteProduct(this, ${data[key]['id']})"><span class="s-incos-sold"><i class="fa fa-trash"></i></a></span></td>
                    </tr>
                `;
                vendidosTabla.innerHTML += template;
            }

            paginate.init('.tablesold', options, filterOptions);
            
        })
        .catch(function(err){
            console.log(err);
        });
    }, 2000);
    //Traer todos los productos que se compraron
    setTimeout(function(){
        receiveData('http://127.0.0.1:8000/buy', new FormData().append('data', null))
        .then(async function(res){
            const respuesta = await res.json();
            const data = respuesta['data'];
            
            let options = {
                numberPerPage:5,
                goBar:false, 
                pageCounter:false,
            };
        
            let filterOptions = {
                el:'#searchBox'
            };
            // console.log(data);
            for (const key in data) {
                const template = `
                    <tr>
                        <td>${parseInt(key)+1}</td>
                        <td>${data[key]['name']}</td>
                        <td>${data[key]['number_of_pieces']}</td>
                        <td>$${data[key]['price']}</td>
                    </tr>
                `;
                comprasTable.innerHTML += template;
            }
            
            
        
            paginate.init('.tablacompras', options, filterOptions);
            
        })
        .catch(function(err){
            console.log(err);
        });
    }, 3000);
    

});

