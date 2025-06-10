<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class tipo_pagamento extends Model
{
    protected $fillable = [
        'id_Tipo_pagamento',
        'id_usuario',
        'nome',
    ];
}
