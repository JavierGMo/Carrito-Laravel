const sendData = async function(URL, data, method, headers){
    const resp = await fetch(URL, {
        headers : headers,
        method : method,
        body : data
    });
    const result = resp;
    return result;

};
const receiveData = async function(URL, data ){
    const resp = await fetch(URL, {
        method : 'GET',
        body : data
    });
    const result = resp;
    return result;
}

document.addEventListener('DOMContentLoaded', function(){

    const productosCategoriaUno = document.getElementById('productos-categoria-uno');
    
    const productosCategoriaDos = document.getElementById('productos-categoria-2');

    //Obtenemos la data mostrar los productos


    receiveData('http://127.0.0.1:8000/product', new FormData().append('data', null))
    .then(async function(res){
        const answer = await res.json();
        const data = answer['data'];
        for (const item of data) {
            // console.log(item);
            const template = `
            <div class="card mx-3" style="width: 18rem;">
                <img src="http://127.0.0.1:8000/storage/${item['ref_img']}" class="card-img-top" alt="Producto temp">
                <div class="card-body">
                    <h5 class="card-title">${item['name']}</h5>
                    <p class="card-text text-truncate">${item['description']}</p>
                    <p class="card-text text-truncate">Precio: $${item['price']}</p>
                    <a href="product/${item['id']}" class="btn btn-primary">Comprar</a>
                </div>
            </div>`
            productosCategoriaUno.innerHTML += template;
        }
    })
    .catch(function(e){
        console.error(e);
    });





});