<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria_entrada extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'id_Categoria_entrada',
        'id_usuario',
        'nome',
        'status',
        'uid'
    ];
}
