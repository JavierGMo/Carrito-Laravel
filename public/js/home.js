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
    const ancho = window.screen.width;
    
    const productosCategoriaUno = document.getElementById('productos-categoria-uno');
    
    const productosCategoriaDos = document.getElementById('productos-categoria-2');

    //ArrowsSlider

    const arrowLeft = document.getElementById('arrow-left-id');
    const arrowRight = document.getElementById('arrow-right-id');

    // const sliderProductos = document.getElementById('#productos-categoria-uno');

    console.log(ancho);
    //Listeners
    // productosCategoriaUno.style.transition = '2s';
    productosCategoriaUno.addEventListener('scroll', function(e){
        e.preventDefault();
        console.log("Hiciste scroll");
    });
    /**
     * Arreglar el scroll, esto se puede arreglar con algunos if dependiendo el tamñano de la pagina
     * y se hace la resta o suma correspondiente
     * igual podriamos hacer que cada vez que se aprieten las flechas calcular el ancho
     * de la pantalla (esto es experimental)
     * 
     */
    arrowLeft.addEventListener('click', function(e){
        e.preventDefault();
        // console.log('Click left');
        productosCategoriaUno.scrollLeft -= (ancho-550);
        console.log(productosCategoriaUno.scrollLeft);
    });
    arrowRight.addEventListener('click', function(e){
        e.preventDefault();
        // console.log('Click right');
        productosCategoriaUno.scrollLeft += (ancho-550);
        console.log(productosCategoriaUno.scrollLeft);
    });
    //Obtenemos la data mostrar los productos


    receiveData('http://127.0.0.1:8000/product', new FormData().append('data', null))
    .then(async function(res){
        const answer = await res.json();
        const data = answer['data'];
        for (const item of data) {
            // console.log(item);
            const template = `
            <div class="card-person mx-3" style="width: 18rem;">
                <img src="http://127.0.0.1:8000/storage/${item['ref_img']}" class="card-person-img" alt="Producto temp">
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