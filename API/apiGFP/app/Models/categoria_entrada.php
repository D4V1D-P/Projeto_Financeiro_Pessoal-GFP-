<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class categoria_entrada extends Model
{
    protected $fillable = [
        'id_Categoria_entrada',
        'id_usuario',
        'nome',
        'status'
    ];
}
