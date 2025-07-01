<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\categoria_entrada;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class CategoriaEntradaController extends Controller
{
    // Mostrar registros
    public function index()
    {
        $registros = categoria_entrada::all();
        $contador = $registros->count();

        if ($contador > 0) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Categoria_Entrada(a) encontrado(a)',
                'data' => $registros,
                'total' => $contador,
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagens' => 'Erro ao achar a(o) Categoria_Entrada(a)',
            ], 404);
        }
    }

    // Criar nova categoria_entrada
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_Categoria_entrada' => '',
            'id_usuario' => 'required',
            'nome' => 'required',
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

        $registros = categoria_entrada::create($request->all());

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

    // Mostrar categoria_entrada por ID
    public function show($id)
    {
        $registros = categoria_entrada::find($id);

        if ($registros) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Categoria_entrada(a) localizado(a) com sucesso',
                'data' => $registros
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Categoria_entrada(a) não localizado(a)'
            ], 404);
        }
    }

    // Atualizar categoria_entrada
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'id_categoria_entrada' => '',
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

        $registroBanco = categoria_entrada::find($id);

        if (!$registroBanco) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Informações do(a) Categoria_entrada(a) não encontradas',
            ], 404);
        }

        // Atualiza apenas os campos enviados
        if ($request->has('id_Categoria_entrada')) $registroBanco->id_Categoria_entrada = $request->id_Categoria_entrada;
        if ($request->has('id_usuario')) $registroBanco->id_usuario = $request->id_usuario;
        if ($request->has('nome')) $registroBanco->nome = $request->nome;
        if ($request->has('status')) $registroBanco->status = $request->status;

        if ($registroBanco->save()) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Informações sobre o(a) Categoria_entrada(a) atualizadas com sucesso',
                'data' => $registroBanco
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Erro ao atualizar as informações sobre o(a) Categoria_entrada(a)'
            ], 500);
        }
    }

    // Deletar Categoria_entrada
    public function destroy($id)
    {
        $registroBanco = categoria_entrada::find($id);

        if (!$registroBanco) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Categoria_entrada(a) não encontrado(a)'
            ], 404);
        }

        if ($registroBanco->delete()) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Categoria_entrada(a) deletado(a) com sucesso'
            ], 200);
        }

        return response()->json([
            'sucesso' => false,
            'mensagem' => 'Erro ao deletar as informações sobre o(a) Categoria_entrada(a)'
        ], 500);
    }

    public function categoriasEntradaUsuario(Request $request)
    {
        return DB::table('categoria_entradas')
            ->select('id_Categoria_entrada', 'nome', 'uid', 'id_usuario')
            ->where('uid', $request->uid)
            ->where('id_usuario', $request->id_usuario)
            ->get();
    }
}
