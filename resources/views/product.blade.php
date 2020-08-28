@extends('layouts.app')

@section('title', 'Producto | Desc-Prod')

@section('content')
    <div class="container">
        <p id="name-product" class="h3 text-center">Nombre del producto</p>
    </div>
    <div class="d-flex p-3 end-content">
        <div class="d-flex flex-column w-75 h-100">
            <div class="w-50 h-50">
                <img src="{{ asset('images/producto.jpg') }}" id="img-product" class="w-100 h-100 rounded" alt="Img producto">
            </div><!--Imagen del producto-->
            <div>
                <div class="my-3">
                    <p class="h3">Descripcion:</p>
                </div><!--Titulo descripcion-->
                <div class="my-2 w-50">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, quod harum magni perferendis blanditiis adipisci cupiditate repudiandae itaque eum quo fugiat dolor nam ipsa quasi a, autem accusamus accusantium incidunt! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, temporibus velit, nobis consequuntur porro, dolorem nisi fugit expedita aut tenetur nam. Enim sequi ab quam reiciendis, odit similique dolorem alias? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores adipisci ea nihil dolorum sunt excepturi eligendi eius facilis veniam vitae? Modi, qui in culpa dicta expedita ad! Incidunt, id deleniti!</p>
                </div><!--Descripcion del producto-->
            </div>
        </div><!--Imagen y descripcion-->


        <div class="d-flex flex-column w-25">
            <div>
                <p>Precio: <span id="precio-producto">$10000</span></p>
            </div><!--Precio del producto-->
            <div class="my-3">
                <form action="">
                    <input type="text" value="id" hidden>
                    <div class="my-3">
                        <label for="">Cantidad:</label>
                        <input type="number" id="cantidad-piezas">
                    </div>
                    <button id="btn-compra-producto" class="w-100 py-3">COMPRAR</button>
                </form>
            </div><!--Cantidad de piezas y compra de producto-->
        </div><!--Aside de compra-->
    </div><!--Descripcion y compra del producto-->
@endsection