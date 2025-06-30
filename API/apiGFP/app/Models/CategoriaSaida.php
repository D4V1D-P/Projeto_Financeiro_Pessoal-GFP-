<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoriaSaida extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'id_Categoria_saida';
    protected $fillable = [
        'id_Categoria_saida',
        'id_usuario',
        'nome',
        'status',
        'uid'
    ];
}
