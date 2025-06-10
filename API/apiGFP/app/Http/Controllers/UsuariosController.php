<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\usuarios;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class UsuariosController extends Controller
{
    // Mostrar registros
    public function index()
    {
        $registros = usuarios::all();
        $contador = $registros->count();

        if ($contador > 0) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Usuario(a) encontrado(a)',
                'data' => $registros,
                'total' => $contador,
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagens' => 'Erro ao achar a(o) Usuario(a)',
            ], 404);
        }
    }

    // Criar novo usuário
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_usuario' => 'required',
            'telefone' => 'required',
            'nome_usuario' => 'required',
            'email' => 'required',
            'descricao' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Registro inválido',
                'erros' => $validator->errors()
            ], 400);
        }

        $registros = usuarios::create($request->all());

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

    // Mostrar usuário por ID
    public function show($id)
    {
        $registros = usuarios::find($id);

        if ($registros) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Usuario(a) localizado(a) com sucesso',
                'data' => $registros
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Usuario(a) não localizado(a)'
            ], 404);
        }
    }

    // Atualizar usuário
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'id_usuario' => '',
            'telefone' => '',
            'nome_usuario' => '',
            'email' => '',
            'descricao' => '',
            'status' => '',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Registro inválido',
                'erros' => $validator->errors()
            ], 400);
        }

        $registroBanco = usuarios::find($id);

        if (!$registroBanco) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Informações do(a) Usuario(a) não encontradas',
            ], 404);
        }

        // Atualiza apenas os campos enviados
        if ($request->has('id_usuario')) $registroBanco->id_usuario = $request->id_usuario;
        if ($request->has('telefone')) $registroBanco->telefone = $request->telefone;
        if ($request->has('nome_usuario')) $registroBanco->nome_usuario = $request->nome_usuario;
        if ($request->has('email')) $registroBanco->email = $request->email;
        if ($request->has('descricao')) $registroBanco->descricao = $request->descricao;
        if ($request->has('status')) $registroBanco->status = $request->status;

        if ($registroBanco->save()) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Informações sobre o(a) Usuario(a) atualizadas com sucesso',
                'data' => $registroBanco
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Erro ao atualizar as informações sobre o(a) Usuario(a)'
            ], 500);
        }
    }

    // Deletar usuário
    public function destroy($id)
    {
        $registroBanco = usuarios::find($id);

        if (!$registroBanco) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Usuario(a) não encontrado(a)'
            ], 404);
        }

        if ($registroBanco->delete()) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Usuario(a) deletado(a) com sucesso'
            ], 200);
        }

        return response()->json([
            'sucesso' => false,
            'mensagem' => 'Erro ao deletar as informações sobre o(a) Usuario(a)'
        ], 500);
    }
}
