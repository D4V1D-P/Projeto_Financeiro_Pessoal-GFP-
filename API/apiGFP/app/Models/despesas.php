<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class despesas extends Model
{
    protected $fillable = [
        'id_despesa',
        'id_Categoria_saida',
        'valor',
        'data',
        'descricao',
        'id_Tipo_pagamento',
        'id_conta',
        'status',
    ];
}
