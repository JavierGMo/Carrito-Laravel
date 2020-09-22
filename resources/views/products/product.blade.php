@extends('layouts.app')

@section('title')
    <title>{{ $data->name }} | Producto</title>
@endsection


@section('actionspanel')
    
    <script src="{{ asset('js/comprarproducto.js') }}"></script>

@endsection

@section('content')
    <div class="container">
        <p id="name-product" class="h3 text-center">{{ $data->name }}</p>
    </div>
    <div class="d-flex p-3 end-content">
        <div class="d-flex flex-column w-75 h-100">
            <div class="w-50 h-50">
                <img src="{{ Storage::url('public/'.$data->ref_img) }}" id="img-product" class="w-100 h-100 rounded" alt="Img producto">
            </div><!--Imagen del producto-->
            <div>
                <div class="my-3">
                    <p class="h3">Descripcion:</p>
                </div><!--Titulo descripcion-->
                <div class="my-2 w-50">
                    <p>{{ $data->description }}</p>
                </div><!--Descripcion del producto-->
            </div>
        </div><!--Imagen y descripcion-->

        


        <div class="d-flex flex-column w-25">
            <div>
                <p>Precio: <span id="precio-producto">${{ $data->price }}</span></p>
                @if ($data->number_of_pieces === 0)
                    <p>Stock: <span>No hay mas en stock :/</span></p>
                @else
                    <p>Stock: <span>{{ $data->number_of_pieces }} piezas</span></p>
                @endif
            </div><!--Precio del producto-->
            <div class="my-3">
                <form action="">

                    <input type="text" id="token" value="{{ csrf_token() }}" hidden>
                    <input type="text" id="id_producto" value="{{ $data->id }}" hidden>
                    <input type="text" id="total_piezas" value="{{ $data->number_of_pieces }}" hidden >
                    <input type="text" id="precio" value="{{ $data->price }}" hidden >
                    <div class="my-3">
                        <label for="">Cantidad:</label>
                        <input type="number" id="cantidad-piezas" @if ($data->number_of_pieces === 0) disabled @endif>
                    </div>
                    <button id="btn-compra-producto" class="w-100 py-3" @if ($data->number_of_pieces === 0) disabled @endif >COMPRAR</button>
                </form>
            </div><!--Cantidad de piezas y compra de producto-->
        </div><!--Aside de compra-->
    </div><!--Descripcion y compra del producto-->
@endsection