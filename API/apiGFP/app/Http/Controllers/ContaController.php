<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conta;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class ContaController extends Controller
{
    // Mostrar registros
    public function index()
    {
        $registros = Conta::all();
        $contador = $registros->count();

        if ($contador > 0) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Conta encontrado(a)',
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
            'id_Conta' => '',
            'id_usuario' => 'required',
            'banco_nome' => 'required',
            'descricao_banco' => 'required',
            'saldo' => 'required',
            'status' => 'required',
            'uid' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Registro inválido',
                'erros' => $validator->errors()
            ], 400);
        }

        $registros = Conta::create($request->all());

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

    // Mostrar Conta por ID
    public function show($id)
    {
        $registros = Conta::find($id);

        if ($registros) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Conta localizada com sucesso',
                'data' => $registros
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Conta não localizada'
            ], 404);
        }
    }

    // Atualizar Conta
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'id_Conta' => '',
            'id_usuario' => '',
            'banco_nome' => '',
            'descricao_banco' => '',
            'saldo' => '', 
            'status' => '',
            
        ]);

        if ($validator->fails()) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Registro inválido',
                'erros' => $validator->errors()
            ], 400);
        }

        $registroBanco = Conta::find($id);

        if (!$registroBanco) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Informações da Conta não encontradas',
            ], 404);
        }

        // Atualiza apenas os campos enviados
        if ($request->has('id_Conta')) $registroBanco->id_Conta = $request->id_Conta;
        if ($request->has('id_usuario')) $registroBanco->id_usuario = $request->id_usuario;
        if ($request->has('banco_nome')) $registroBanco->banco_nome = $request->banco_nome;
        if ($request->has('descricao_banco')) $registroBanco->descricao_banco = $request->descricao_banco;
        if ($request->has('saldo')) $registroBanco->saldo = $request->saldo;
        if ($request->has('status')) $registroBanco->status = $request->status;

        if ($registroBanco->save()) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Informações sobre a Conta atualizadas com sucesso',
                'data' => $registroBanco
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Erro ao atualizar as informações sobre a Conta'
            ], 500);
        }
    }

    // Deletar Conta
    public function destroy($id)
    {
        $registroBanco = Conta::find($id);

        if (!$registroBanco) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Conta não encontrada'
            ], 404);
        }

        if ($registroBanco->delete()) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Conta deletada com sucesso'
            ], 200);
        }

        return response()->json([
            'sucesso' => false,
            'mensagem' => 'Erro ao deletar as informações sobre a Conta'
        ], 500);
    }
}
