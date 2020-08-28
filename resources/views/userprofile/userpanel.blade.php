@extends('layouts.app')

@section('title', 'Nombre de usuario')

@section('actionspanel')
    <script src="{{ asset('js/userpanel.js') }}"></script>
@endsection

@section('content')
    <div class="d-flex end-content">
        <div class="opciones-panel p-2 w-25">
            <div><a id="mueve-perfil" href="#">Perfil</a></div>
            <div><a id="mueve-vender" href="#">Vender</a></div>
            <div><a id="mueve-compras" href="#">Compras</a></div>
            <div><a id="mueve-cambiar-contra" href="#">Cambiar contraseña</a></div>
            <div><a id="mueve-eiliminar" href="#" class="text-danger">Eliminar cuenta</a></div>
        </div><!--Aside menu-->
        <div class="d-flex flex-column w-75 end-content">
            <div id="conte-perfil" class="">
                <div>
                    <p class="h3 text-center">Perfil</p>
                </div><!--Titulo seccion-->
                <div class="d-flex w-75">
                    <div class="w-50 h-50">
                        <img src="{{ asset('images/producto.jpg') }}" class="w-100 h-100 rounded" alt="Image profile">
                    </div><!--Imagen de perfil-->
                    <div class="d-flex flex-column w-50 p-3">
                        <div>
                            <div>
                                <p>Nombre(s): <span id="nombre-usuario">Nombre completo</span> </p>
                            </div>
                        </div><!--Nombre-->
                        <div>
                            <div>
                                <p>Apellido(s): <span id="apellido-usuario">Apellido(s)</span></p>
                            </div>
                        </div><!--Apellidos-->
                        <div>
                            <div>
                                <p>Direccion: <span id="direccion-usuario">Calle de calle Num 7 num ext 8</span></p>
                            </div>
                        </div><!--Direccion-->
                        <div>
                            <div>
                                <p>Fecha de creacion: <span id="fecha-creacion-usuario">dd/mm/yyyy</span></p>
                            </div>
                        </div><!--Fecha de creacion cuenta-->
                    </div><!--Informacion del usuario-->

                </div><!--Contenido perfil-->
            </div><!--Perfil usuario-->

            <div id="conte-vender" class="oculto">
                <div>
                    <p class="h3 text-center">Vender</p>
                </div><!--Titulo vender-->
                <div class="vender-producto container w-75 p-3">
                    <form class="form-style">
                        <input type="text" id="token_producto" value="{{ csrf_token() }}" hidden>
                        <div>
                            <label for="">Imagen del producto:</label>
                            <input  id="img_producto" type="file">
                        </div>
                        <div>
                            <label for="">Nombre del producto:</label>
                            <input id="nombre_producto" type="text">
                        </div>
                        <div>
                            <label for="">Descripcion del producto:</label>
                            <textarea id="descripcion_producto" cols="15" rows="5"></textarea>
                        </div>
                        <div>
                            <label for="">Numero de piezas:</label>
                            <input id="numero_piezas_producto" type="number">
                        </div>
                        <div>
                            <label for="">Precio por unidad:</label>
                            <input id="precio_unidad_producto" type="number">
                        </div>
                        <div class="d-flex justify-content-center">
                            <button id="btn-vender" class="py-3 w-50">VENDER</button>
                        </div>
                    </form>
                </div><!--Form para vender-->
            </div><!--Vender producto-->

            <div id="conte-compras" class="oculto">
                <div>
                    <p class="h3 text-center">Compras</p>
                </div><!--Titulo compras-->
                <div class="d-flex flex-column">
                    <div class="container tabla-compras w-50 p-4">
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Producto</th>
                                <th>Numero de piezas</th>
                                <th>Total</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Casa de campaña</td>
                                <td>1</td>
                                <td>$1000</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Mochila</td>
                                <td>1</td>
                                <td>$1000</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Auto Mustang</td>
                                <td>1</td>
                                <td>$1000</td>
                            </tr>
                        </table>
                    </div><!--contenedor de tabla-->
                    <div class="d-flex justify-content-center">
                        <div class="m-2 p-2 cuadro-paginacion">1</div>
                        <div class="m-2 p-2 cuadro-paginacion">2</div>
                        <div class="m-2 p-2 cuadro-paginacion">...</div>
                        <div class="m-2 p-2 cuadro-paginacion">n</div>
                    </div><!--Bnts paginacion-->
                </div><!--Comrpas realizadas-->
            </div><!--Productos comprados-->
            
            <div id="conte-cambio-contra" class="oculto">
                <div>
                    <p class="h3 text-center">Cambiar contraseña</p>
                </div><!--Titulo cambiar contrasenia-->
                <div class="container container-cambio-contrasenia w-50 p-3">
                    <form action="" class="m-4">
                        <div class="my-3">
                            <label for="">Nueva contraseña</label>
                            <input type="password" id="nueva-contrasenia">
                        </div>
                        <div class="my-3">
                            <label for="">Confirmar nueva contraseña</label>
                            <input type="password" id="confirmar-nueva-contrasenia">
                        </div>
                        <div class="d-flex justify-content-center mt-4">
                            <button id="btn-cambio-contrasenia" class="py-2 w-75">CAMBIAR CONTRASEÑA</button>
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
                    <div id="form-eliminar-cuenta" class="container container-eliminar-cuenta p-3 w-50 oculto">
                        <form action="" class="m-4">
                            <div>
                                <label for="">Escriba su contraseña</label>
                                <input type="password" id="contrasenia-para-borrar">
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