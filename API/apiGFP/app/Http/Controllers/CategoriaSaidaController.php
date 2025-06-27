<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CategoriaSaida;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class CategoriaSaidaController extends Controller
{
    // Mostrar registros
    public function index()
    {
        $registros = CategoriaSaida::all();
        $contador = $registros->count();

        if ($contador > 0) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'CategoriaSaida(a) encontrado(a)',
                'data' => $registros,
                'total' => $contador,
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagens' => 'Erro ao achar a(o) CategoriaSaida(a)',
            ], 404);
        }
    }

    // Criar nova CategoriaSaida
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_CategoriaSaida' => 'required',
            'id_usuario' => 'required',
            'nome' => 'required',
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

        $registros = CategoriaSaida::create($request->all());

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

    // Mostrar Categoria Saida por ID
    public function show($id)
    {
        $registros = CategoriaSaida::find($id);

        if ($registros) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Categoria_Saida(a) localizado(a) com sucesso',
                'data' => $registros
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Categoria_Saida(a) não localizado(a)'
            ], 404);
        }
    }

    // Atualizar Categoria Saida
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'id_CategoriaSaida' => '',
            'id_usuario' => '', 
            'nome' => '',
            'status' => '',
            
        ]);

        if ($validator->fails()) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Registro inválido',
                'erros' => $validator->errors()
            ], 400);
        }

        $registroBanco = CategoriaSaida::find($id);

        if (!$registroBanco) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Informações do(a) Categoria_Saida(a) não encontradas',
            ], 404);
        }

        // Atualiza apenas os campos enviados
        if ($request->has('id_CategoriaSaida')) $registroBanco->id_CategoriaSaida = $request->id_CategoriaSaida;
        if ($request->has('id_usuario')) $registroBanco->id_usuario = $request->id_usuario;
        if ($request->has('nome')) $registroBanco->nome = $request->nome;
        if ($request->has('status')) $registroBanco->status = $request->status;

        if ($registroBanco->save()) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Informações sobre o(a) Categoria Saida atualizadas com sucesso',
                'data' => $registroBanco
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Erro ao atualizar as informações sobre o(a) Categoria Saida'
            ], 500);
        }
    }

    // Deletar Categoria Saida
    public function destroy($id)
    {
        $registroBanco = CategoriaSaida::find($id);

        if (!$registroBanco) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Categoria Saida não encontrado(a)'
            ], 404);
        }

        if ($registroBanco->delete()) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Categoria Saida deletado(a) com sucesso'
            ], 200);
        }

        return response()->json([
            'sucesso' => false,
            'mensagem' => 'Erro ao deletar as informações sobre o(a) Categoria Saida'
        ], 500);
    }
}
