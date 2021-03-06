@extends('layouts.app')


@section('title')
    <title>Inicio</title>
@endsection

@section('actionspanel')

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.css">


    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.js"></script>

    <script src="{{ asset('js/home.js') }}"></script>
    
@endsection

@section('content')
    <div id="carouselExampleControls" class="carousel slide mt-4" data-ride="carousel">
        <div class="carousel-inner">
            {{-- <div class="carousel-item active">
                <img src="{{ asset('images/cancha.png') }}" class="d-block w-100" alt="add-1">
            </div> --}}
            <div class="carousel-item active">
                <img src="{{ asset('images/producto.jpg') }}" class="d-block w-100" alt="add-2">
            </div>
            <div class="carousel-item">
                <img src="{{ asset('images/producto.jpg') }}" class="d-block w-100" alt="add-3">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div><!--ads-->

    <div class="mt-3 p-1 d-flex flex-column end-content">
        <div><p class="h3 my-3 text-center">Productos numero uno</p></div>
        <div class="slider">
            <div id="productos-categoria-uno" class="d-flex my-3">
            </div><!--Tira de productos uno-->
            <div class="arrows d-flex align-content-around">
                <div id="arrow-left-id" class="arrow-left"><i class="fa fa-angle-left"></i></div>
                <div id="arrow-right-id" class="arrow-right"><i class="fa fa-angle-right"></i></div>
            </div>
            
        </div>
        

        <div><p class="h3 my-3 text-center">Productos numero dos</p></div>
        <div id="productos-categoria-2" class="d-flex my-3">
            <div class="card mx-3" style="width: 18rem;">
                <img src="{{ asset('images/producto.jpg') }}" class="card-img-top" alt="Producto temp">
                <div class="card-body">
                    <h5 class="card-title">Nombre del producto</h5>
                    <p class="card-text text-truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, illo distinctio vero, dolorum a consequatur dolor expedita possimus sequi molestias quae nostrum fugit laborum perferendis omnis rem iure voluptatem! Laboriosam?</p>
                    <p class="card-text text-truncate">Precio: $10000</p>
                    <a href="#" class="btn btn-primary">Comprar</a>
                </div>
            </div>
            <div class="card mx-3" style="width: 18rem;">
                <img src="{{ asset('images/producto.jpg') }}" class="card-img-top" alt="Producto temp">
                <div class="card-body">
                    <h5 class="card-title">Nombre del producto</h5>
                    <p class="card-text text-truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, illo distinctio vero, dolorum a consequatur dolor expedita possimus sequi molestias quae nostrum fugit laborum perferendis omnis rem iure voluptatem! Laboriosam?</p>
                    <p class="card-text text-truncate">Precio: $10000</p>
                    <a href="#" class="btn btn-primary">Comprar</a>
                </div>
            </div>
            <div class="card mx-3" style="width: 18rem;">
                <img src="{{ asset('images/producto.jpg') }}" class="card-img-top" alt="Producto temp">
                <div class="card-body">
                    <h5 class="card-title">Nombre del producto</h5>
                    <p class="card-text text-truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, illo distinctio vero, dolorum a consequatur dolor expedita possimus sequi molestias quae nostrum fugit laborum perferendis omnis rem iure voluptatem! Laboriosam?</p>
                    <p class="card-text text-truncate">Precio: $10000</p>
                    <a href="#" class="btn btn-primary">Comprar</a>
                </div>
            </div>
            <div class="card mx-3" style="width: 18rem;">
                <img src="{{ asset('images/producto.jpg') }}" class="card-img-top" alt="Producto temp">
                <div class="card-body">
                    <h5 class="card-title">Nombre del producto</h5>
                    <p class="card-text text-truncate">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, illo distinctio vero, dolorum a consequatur dolor expedita possimus sequi molestias quae nostrum fugit laborum perferendis omnis rem iure voluptatem! Laboriosam?</p>
                    <p class="card-text text-truncate">Precio: $10000</p>
                    <a href="#" class="btn btn-primary">Comprar</a>
                </div>
            </div>
        </div><!--Tira de productos uno-->
    </div><!--productos-->
    {{-- <img src="{{ Storage::url('public/products/07_9_2020_45_24_239_Gato cholo.jpg') }}" alt=""> --}}

@endsection
