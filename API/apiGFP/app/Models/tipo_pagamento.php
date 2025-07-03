<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tipo_pagamento extends Model
{
    protected $primaryKey = 'id_Tipo_pagamento';
    public $timestamps = false;
    protected $fillable = [
        'id_Tipo_pagamento',
        'id_usuario',
        'nome',
        'uid'
    ];
}
