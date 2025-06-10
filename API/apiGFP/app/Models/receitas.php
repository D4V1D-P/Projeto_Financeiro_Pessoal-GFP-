<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class receitas extends Model
{
    protected $fillable = [
        'id_receita',
        'id_Categoria_entrada',
        'valor',
        'data',
        'descricao',
        'id_Tipo_pagamento',
        'id_conta',
        'status',
    ];
}
