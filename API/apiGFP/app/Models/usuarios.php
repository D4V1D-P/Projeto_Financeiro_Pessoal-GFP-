<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class usuarios extends Model
{
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
