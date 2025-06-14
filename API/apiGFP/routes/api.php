<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\ReceitasController;
use App\Http\Controllers\DespesasController;
use App\Http\Controllers\CategoriaEntradaController;
use App\Http\Controllers\CategoriaSaidaController;
use App\Http\Controllers\ContaController;
use App\Http\Controllers\TipoPagamentoController;

Route::get('/', function(){return response()->json(['sucesso'=>true]);});

//Rotas para o CRUD dos usuários
Route::get('/usuarios', [UsuariosController::class, 'index']);
Route::get('/usuarios/{codigo}', [UsuariosController::class, 'show']);
Route::post('/usuarios', [UsuariosController::class, 'store']);
Route::put('/usuarios/{id}', [UsuariosController::class, 'update']);
Route::delete('/usuarios/{id}', [UsuariosController::class, 'destroy']);

//Rotas para o CRUD das Receitas
Route::get('/receitas', [ReceitasController::class, 'index']);
Route::get('/receitas/{codigo}', [ReceitasController::class, 'show']);
Route::post('/receitas', [ReceitasController::class, 'store']);
Route::put('/receitas/{id}', [ReceitasController::class, 'update']);
Route::delete('/receitas/{id}', [ReceitasController::class, 'destroy']);

//Rotas para o CRUD das Despesas
Route::get('/despesas', [DespesasController::class, 'index']);
Route::get('/despesas/{codigo}', [DespesasController::class, 'show']);
Route::post('/despesas', [DespesasController::class, 'store']);
Route::put('/despesas/{id}', [DespesasController::class, 'update']);
Route::delete('/despesas/{id}', [DespesasController::class, 'destroy']);

//Rotas para o CRUD da categoria_entrada
Route::get('/categoria_entrada', [CategoriaEntradaController::class, 'index']);
Route::get('/categoria_entrada/{codigo}', [CategoriaEntradaController::class, 'show']);
Route::post('/categoria_entrada', [CategoriaEntradaController::class, 'store']);
Route::put('/categoria_entrada/{id}', [CategoriaEntradaController::class, 'update']);
Route::delete('/categoria_entrada/{id}', [CategoriaEntradaController::class, 'destroy']);

//Rotas para o CRUD da CategoriaSaida
Route::get('/CategoriaSaida', [CategoriaSaidaController::class, 'index']);
Route::get('/CategoriaSaida/{codigo}', [CategoriaSaidaController::class, 'show']);
Route::post('/CategoriaSaida', [CategoriaSaidaController::class, 'store']);
Route::put('/CategoriaSaida/{id}', [CategoriaSaidaController::class, 'update']);
Route::delete('/CategoriaSaida/{id}', [CategoriaSaidaController::class, 'destroy']);

//Rotas para o CRUD da Conta
Route::get('/Conta', [ContaController::class, 'index']);
Route::get('/Conta/{codigo}', [ContaController::class, 'show']);
Route::post('/Conta', [ContaController::class, 'store']);
Route::put('/Conta/{id}', [ContaController::class, 'update']);
Route::delete('/Conta/{id}', [ContaController::class, 'destroy']);

//Rotas para o CRUD do tipo de pagamento
Route::get('/tipo_pagamento', [TipoPagamentoController::class, 'index']);
Route::get('/tipo_pagamento/{codigo}', [TipoPagamentoController::class, 'show']);
Route::post('/tipo_pagamento', [TipoPagamentoController::class, 'store']);
Route::put('/tipo_pagamento/{id}', [TipoPagamentoController::class, 'update']);
Route::delete('/tipo_pagamento/{id}', [TipoPagamentoController::class, 'destroy']);