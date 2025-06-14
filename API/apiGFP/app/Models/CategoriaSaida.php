<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class categoriasaida extends Model
{
    protected $fillable = [
        'id_CategoriaSaida',
        'id_usuario',
        'nome',
        'status'
    ];
}
