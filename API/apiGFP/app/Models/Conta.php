<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class conta extends Model
{
    protected $fillable = [
        'id_conta',
        'id_usuario',
        'banco_nome',
        'descricao_banco',
        'saldo',
        'status'
    ];
}
