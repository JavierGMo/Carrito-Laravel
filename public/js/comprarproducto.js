const sendData = async function(URL, data, method, headers){
    const resp = await fetch(URL, {
        headers : headers,
        method : method,
        body : data
    });
    const result = resp;
    return result;

};

document.addEventListener('DOMContentLoaded', function(){
    const btnComprar = document.getElementById('btn-compra-producto');
    btnComprar.addEventListener('click', function(e){
        e.preventDefault();
        let cantidadPiezas = document.getElementById('cantidad-piezas');

        const token = document.getElementById('token');
        const idProducto = document.getElementById('id_producto');
        const totalPiezas = document.getElementById('total_piezas');
        const precio = document.getElementById('precio').value;

        const data = new URLSearchParams();
        

        if(cantidadPiezas.value === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No deje los campos vacios'
            });
            return;  
        }else if(parseInt(totalPiezas.value) === 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vaya, ya no quedan piezas :/'
            });
            return;
        }else if(parseInt(totalPiezas.value)<parseInt(cantidadPiezas.value)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay tantas piezas, lo sentimos :/'
            });
            return;
        }else{
            Swal.fire({
                title: '¿Comprar?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#28a745',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, comprar',
                cancelButtonText:'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    data.append('cantidad', cantidadPiezas.value);
                    data.append('total', (parseFloat(precio)*parseInt(cantidadPiezas.value)));
                    data.append('idProducto', idProducto.value);
                    // console.log(parseInt(totalPiezas.value)-parseInt(cantidadPiezas.value));
            
            
                    sendData(`http://127.0.0.1:8000/buy`, data, 'POST',{
                        'X-CSRF-TOKEN' : token.value
                    })
                    .then(async function(res){
                        const data = await res.text();
                        if(res.status === 200){
                            Swal.fire({
                                title : '!Exito¡',
                                text : 'Producto comprado',
                                icon : 'success',
                                onClose: () => {
                                    location.reload()
                                }}
                            );
                            cantidadPiezas = '';
                        }else if(res.status === 400){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Vaya, parece que ya no hay stock'
                            });
                        }else if(res.status === 401){
                            Swal.fire({
                                icon: 'error',
                                title: 'Sesion',
                                text: 'Inicie sesion'
                            });
                        }else if(res.status === 500){
                            console.log(`Error: ${data}`);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Intente mas tarde, algo salio mal'
                            });
                        }
                        cantidadPiezas.value = '';
                    })
                    .catch(function(e){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo salio mal, intenta de nuevo'
                        });
                    });
                }
            });
        }
    });

});