<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Despesas extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'id',
            'id_usuario',
            'id_Categoria_saida',
            'valor' ,
            'data',
            'descricao' ,
            'id_Tipo_pagamento',
            'status',
            'id_conta',
            'uid'
    ];
}
