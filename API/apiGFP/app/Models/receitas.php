<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Receitas extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'id_Categoria_entrada',
        'valor',
        'data',
        'descricao',
        'id_Tipo_pagamento',
        'id_conta',
        'status',
    ];
}
