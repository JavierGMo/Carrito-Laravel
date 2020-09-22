@extends('layouts.app')

@section('title')
    <title>{{ $name }} | Panel</title>
@endsection

@section('actionspanel')
    <link rel="stylesheet" href="{{ asset('css/paginate.css') }}">

    <script src="{{ asset('js/userpanel.js') }}"></script>
    <script src="{{ asset('js/paginate.min.js') }}"></script>
@endsection

@section('content')
    <div class="d-flex end-content h-100 w-100">
        
        <div class="opciones-panel mr-2 p-2 w-25">
            <div><a id="mueve-perfil" href="#" class="text-decoration-none" ><i class="fa fa-user-circle"></i> Perfil</a></div>
            <div><a id="mueve-vender" href="#" class="text-decoration-none" ><i class="fa fa-tag"></i> Vender producto</a></div>
            <div><a id="mueve-vendidos" href="#" class="text-decoration-none" ><i class="fa fa-tag"></i> Productos vendidos</a></div>
            <div><a id="mueve-compras" href="#" class="text-decoration-none" ><i class="fa fa-shopping-bag"></i> Compras</a></div>
            <div><a id="mueve-cambiar-contra" href="#" class="text-decoration-none" ><i class="fa fa-lock"></i> Cambiar contraseña</a></div>
            <div><a id="mueve-eiliminar" href="#" class="text-decoration-none text-danger"><i class="fa fa-user-times"></i> Eliminar cuenta</a></div>
        </div><!--Aside menu-->
        <div class="d-flex flex-column w-75 end-content">
            <div id="conte-perfil" class="">
                <div>
                    <p class="h3 text-center">Perfil</p>
                </div><!--Titulo seccion-->
                <div class="d-flex w-75">
                    <div class="w-50 h-50">
                        <img src="{{ Storage::url($ref_img) }}" class="w-100 h-100 rounded" alt="Image profile">
                    </div><!--Imagen de perfil-->
                    <div class="d-flex flex-column w-50 p-3">
                        <div>
                            <div>
                                <p>Nombre(s): <span id="nombre-usuario">{{ $name }}</span> </p>
                            </div>
                        </div><!--Nombre-->
                        <div>
                            <div>
                                <p>Apellido(s): <span id="apellido-usuario">{{ $last_name }}</span></p>
                            </div>
                        </div><!--Apellidos-->
                        {{-- <div>
                            <div>
                                <p>Direccion: <span id="direccion-usuario">Calle de calle Num 7 num ext 8</span></p>
                            </div>
                        </div><!--Direccion--> --}}
                        <div>
                            <div>
                                <p>Fecha de creacion: <span id="fecha-creacion-usuario">{{ $created_at }}</span></p>
                            </div>
                        </div><!--Fecha de creacion cuenta-->
                    </div><!--Informacion del usuario-->

                </div><!--Contenido perfil-->
            </div><!--Perfil usuario-->

            <div id="conte-vender" class="oculto">
                <div>
                    <p class="h3 text-center">Vender</p>
                </div><!--Titulo vender-->
                <div class="contain-form-style container w-75 p-3">
                    <form class="form-style">
                        <input type="text" id="token_producto" value="{{ csrf_token() }}" hidden>
                        <div>
                            <label for="img_producto">Imagen del producto</label>
                            <input  id="img_producto" type="file" required>
                        </div>
                        <div>
                            <input id="nombre_producto" type="text" placeholder="Nombre" required>
                        </div>
                        <div>
                            <textarea id="descripcion_producto" cols="15" rows="5" placeholder="Descripcion" required></textarea>
                        </div>
                        <div>
                            <input id="numero_piezas_producto" type="number" placeholder="Numero de piezas" required>
                        </div>
                        <div>
                            <input id="precio_unidad_producto" type="number" placeholder="Precio por unidad" required>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button id="btn-vender" class="btn btn-success py-3 w-50">VENDER</button>
                        </div>
                    </form>
                </div><!--Form para vender-->
            </div><!--Vender producto-->

            <div id="conte-vendidos" class="oculto">
                <div>
                    <p class="h3 text-center">Productos vendidos</p>
                </div><!--Titulo vendidos-->
                <div class="d-flex flex-column">
                    <div class="container tabla-compras w-50 p-4">
                        <div class="panel my-3">
                            <div class="body">
                                <div class="input-group">
                                    <label for="searchBox">Filtrar: </label>
                                    <input type="search" id="searchSold" class="mx-1" placeholder="Buscar...">
                                </div>
                            </div>
                        </div>
                        <table id="sold-table" class="tablesold">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Producto</th>
                                    <th>Descripcion</th>
                                    <th>Numero de piezas</th>
                                    <th>Costo por unidad</th>
                                    <th>Editar</th>
                                    <th>Borrar</th>
                                </tr>
                            </thead>
                        </table>
                    </div><!--contenedor de tabla-->
                    <div class="m-1 container">
                        <form class="m-1 container">
                            <p>Injection form</p>
                            <input type="text" id="token-update-products" value="{{ csrf_token() }}" hidden>
                            <div id="form-injection">

                            </div>
                            <button id="update-product" class="btn btn-success">Actualizar</button>
                        </form><!--Form para actualizar-->    
                    </div>
                </div><!--Comrpas realizadas-->
            </div><!--Productos vendidos-->

            <div id="conte-compras" class="oculto">
                <div>
                    <p class="h3 text-center">Compras</p>
                </div><!--Titulo compras-->
                <div class="d-flex flex-column">
                    <div class="container tabla-compras w-50 p-4">
                        <div class="panel my-3">
                            <div class="body">
                                <div class="input-group">
                                    <label for="searchBox">Filtrar: </label>
                                    <input type="search" id="searchBox" class="mx-1" placeholder="Filtrar...">
                                </div>
                            </div>
                        </div>
                        <table id="compras-table" class="tablacompras table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Producto</th>
                                    <th>Numero de piezas</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                        </table>
                    </div><!--contenedor de tabla-->
                </div><!--Comrpas realizadas-->
            </div><!--Productos comprados-->
            
            <div id="conte-cambio-contra" class="oculto">
                <div>
                    <p class="h3 text-center">Cambiar contraseña</p>
                </div><!--Titulo cambiar contrasenia-->
                <div class="container contain-form-style w-50 p-3">
                    <form action="" class="m-4">
                        <input type="text" id="token_cambio_p" value="{{ csrf_token() }}" hidden>
                        <input type="text" id="id_user_c_p" value="{{ $id }}" hidden>
                        <div class="my-3">
                            <input type="password" id="nueva-contrasenia" placeholder="Nueva contraseña" required>
                        </div>
                        <div class="my-3">
                            <input type="password" id="confirmar-nueva-contrasenia" placeholder="Confirmar contraseña" required>
                        </div>
                        <div class="d-flex justify-content-center mt-4">
                            <button id="btn-cambio-contrasenia" class="btn btn-success py-2 w-75">CAMBIAR CONTRASEÑA</button>
                        </div>
                    </form>
                </div><!--Form para cambiar contraseña-->
            </div><!--Cambiar contrasenia-->


            <div id="conte-eliminar" class="oculto">
                <div>
                    <p class="h3 text-center">Eliminar cuenta</p>
                </div><!--Titulo eliminar cuenta-->
                <div>
                    <div class="d-flex justify-content-center m-4">
                        <button id="btn-pre-eliminar" class="btn btn-danger">Eliminar cuenta</button>
                    </div><!--Boton de precaucion-->
                    <div id="form-eliminar-cuenta" class="container contain-form-style p-3 w-50 oculto">
                        <form action="" class="m-4">

                            <input type="text" id="id_delete" value="{{ $id }}" hidden>
                            <input type="text" id="token_delete" value="{{ csrf_token() }}" hidden>

                            <div>
                                <input type="password" id="contrasenia_para_borrar" placeholder="Contraseña actual" required>
                            </div>
                            <div class="d-flex justify-content-center mt-4">
                                <button id="btn-eliminar-cuenta" class="btn btn-danger py-2 w-50">Eliminar</button>
                            </div>
                        </form>
                    </div><!--Form para eiliminar la cuenta-->
                </div><!--form para eliminar cuenta-->
            </div><!--Eliminar cuenta-->


        </div><!--Contenido-->
    </div><!--Contenido del panel del usuario-->
@endsection