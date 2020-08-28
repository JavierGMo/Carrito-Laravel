<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'img_producto', 'nombre_producto', 'descripcion_producto', 'numero_piezas_producto', 'precio_unidad_producto'
    ];
}
