<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\tipo_pagamento;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class TipoPagamentoController extends Controller
{
    // Mostrar registros
    public function index()
    {
        $registros = tipo_pagamento::all();
        $contador = $registros->count();

        if ($contador > 0) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Tipo de pagamento encontrado(a)',
                'data' => $registros,
                'total' => $contador,
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagens' => 'Erro ao achar Conta',
            ], 404);
        }
    }

    // Criar nova Conta
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_Tipo_pagamento' => 'required',
            'id_usuario' => 'required',
            'nome' => 'required',
            'uid' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Registro inválido',
                'erros' => $validator->errors()
            ], 400);
        }

        $registros = tipo_pagamento::create($request->all());

        if ($registros) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Registro criado com sucesso',
                'data' => $registros
            ], 201);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Erro ao criar o registro'
            ], 500);
        }
    }

    // Mostrar o Tipo de pagamento por ID
    public function show($id)
    {
        $registros = tipo_pagamento::find($id);

        if ($registros) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Tipo de pagamento localizado com sucesso',
                'data' => $registros
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Tipo de pagamento não localizado'
            ], 404);
        }
    }

    // Atualizar Tipo de pagamento
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'id_Tipo_pagamento' => '',
            'id_usuario' => '',
            'nome' => '',
            
        ]);

        if ($validator->fails()) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Registro inválido',
                'erros' => $validator->errors()
            ], 400);
        }

        $registroBanco = tipo_pagamento::find($id);

        if (!$registroBanco) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Informações do Tipo de pagamento não encontradas',
            ], 404);
        }

        // Atualiza apenas os campos enviados
        if ($request->has('id_Tipo_pagamento')) $registroBanco->id_Tipo_pagamento = $request->id_Tipo_pagamento;
        if ($request->has('id_usuario')) $registroBanco->id_usuario = $request->id_usuario;
        if ($request->has('nome')) $registroBanco->nome = $request->nome;

        if ($registroBanco->save()) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Informações sobre o tipo de pagamento atualizadas com sucesso',
                'data' => $registroBanco
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Erro ao atualizar as informações sobre o Tipo de pagamento'
            ], 500);
        }
    }

    // Deletar o tipo de pagamento
    public function destroy($id)
    {
        $registroBanco = tipo_pagamento::find($id);

        if (!$registroBanco) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Tipo de pagamento não encontrado'
            ], 404);
        }

        if ($registroBanco->delete()) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Tipo de pagamento deletado com sucesso'
            ], 200);
        }

        return response()->json([
            'sucesso' => false,
            'mensagem' => 'Erro ao deletar as informações sobre o Tipo de pagamento'
        ], 500);
    }
}
