<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Buy extends Model
{
    //
    protected $fillable = [
        'number_of_pieces', 'price', 'product_id', 'user_id'
    ];
}
