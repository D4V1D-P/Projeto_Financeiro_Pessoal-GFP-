<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios; // <- Corrigido aqui
use Illuminate\Support\Facades\Validator;

class UsuariosController extends Controller
{
    public function index()
    {
        $registros = Usuarios::all(); // <- Corrigido
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

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_usuario' => '',
            'telefone' => '',
            'nome_usuario' => '',
            'email' => '',
            'descricao' => '',
            'status' => '',
            'uid' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Registro inválido',
                'erros' => $validator->errors()
            ], 400);
        }

        $registros = Usuarios::create($request->all()); // <- Corrigido

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

    public function show($id)
    {
        $registros = Usuarios::find($id); // <- Corrigido

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

        $registroBanco = Usuarios::find($id); // <- Corrigido

        if (!$registroBanco) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Informações do(a) Usuario(a) não encontradas',
            ], 404);
        }

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

    public function destroy($id)
    {
        $registroBanco = Usuarios::find($id); // <- Corrigido

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
