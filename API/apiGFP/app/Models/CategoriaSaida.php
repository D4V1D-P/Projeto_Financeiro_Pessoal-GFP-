<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class categoria_saida extends Model
{
    protected $fillable = [
        'id_CategoriaSaida',
        'id_usuario',
        'nome',
        'status'
    ];
}
