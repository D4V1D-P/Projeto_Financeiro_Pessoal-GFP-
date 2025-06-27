<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'id_usuario',
        'telefone',
        'nome_usuario',
        'email',
        'descricao',
        'status',
        'uid'
    ];
}
