<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conta extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'id_conta';
    protected $fillable = [
        'id_conta',
        'id_usuario',
        'banco_nome',
        'descricao_banco',
        'saldo',
        'status',
        'uid'
    ];
}
