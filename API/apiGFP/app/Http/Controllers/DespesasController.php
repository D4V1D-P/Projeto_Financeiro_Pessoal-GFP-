<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\despesas;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class DespesasController extends Controller
{
    // Mostrar registros
    public function index()
    {
        $registros = despesas::all();
        $contador = $registros->count();

        if ($contador > 0) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Despesa(a) encontrado(a)',
                'data' => $registros,
                'total' => $contador,
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagens' => 'Erro ao achar a(o) Despesa(a)',
            ], 404);
        }
    }

    // Criar nova despesa
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => '',
            'id_usuario' => 'required',
            'id_Categoria_saida' => 'required',
            'valor' => 'required',
            'data' => 'required',
            'descricao' => '',
            'id_Tipo_pagamento' => 'required',
            'status' => '',
            'id_conta' => 'required',
            'uid' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Registro inválido',
                'erros' => $validator->errors()
            ], 400);
        }

        $registros = despesas::create($request->all());

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

    // Mostrar despesa por ID
    public function show($id)
    {
        $registros = despesas::find($id);

        if ($registros) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Despesa(a) localizado(a) com sucesso',
                'data' => $registros
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Despesa(a) não localizado(a)'
            ], 404);
        }
    }

    // Atualizar despesa
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'id_despesa' => '',
            'id_Categoria_entrada' => '',
            'valor' => '',
            'data' => '',
            'descricao' => '',
            'id_Tipo_pagamento' => '',
            'id_conta' => '',
            'status' => '',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Registro inválido',
                'erros' => $validator->errors()
            ], 400);
        }

        $registroBanco = despesas::find($id);

        if (!$registroBanco) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Informações do(a) Despesa(a) não encontradas',
            ], 404);
        }

        // Atualiza apenas os campos enviados
        if ($request->has('id_despesa')) $registroBanco->id_despesa = $request->id_despesa;
        if ($request->has('id_Categoria_entrada')) $registroBanco->id_Categoria_entrada = $request->id_Categoria_entrada;
        if ($request->has('valor')) $registroBanco->valor = $request->valor;
        if ($request->has('data')) $registroBanco->data = $request->data;
        if ($request->has('descricao')) $registroBanco->descricao = $request->descricao;
        if ($request->has('id_Tipo_pagamento')) $registroBanco->id_Tipo_pagamento = $request->id_Tipo_pagamento;
        if ($request->has('id_conta')) $registroBanco->id_conta = $request->id_conta;
        if ($request->has('status')) $registroBanco->status = $request->status;

        if ($registroBanco->save()) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Informações sobre o(a) Despesa(a) atualizadas com sucesso',
                'data' => $registroBanco
            ], 200);
        } else {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Erro ao atualizar as informações sobre o(a) Despesa(a)'
            ], 500);
        }
    }

    // Deletar Despesa
    public function destroy($id)
    {
        $registroBanco = despesas::find($id);

        if (!$registroBanco) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Despesa(a) não encontrado(a)'
            ], 404);
        }

        if ($registroBanco->delete()) {
            return response()->json([
                'sucesso' => true,
                'mensagem' => 'Despesa(a) deletado(a) com sucesso'
            ], 200);
        }

        return response()->json([
            'sucesso' => false,
            'mensagem' => 'Erro ao deletar as informações sobre o(a) Despesa(a)'
        ], 500);
    }

    public function getDespesasDoUsuario(Request $request)
{
    $uid = $request->uid;

    if (!$uid) {
        return response()->json([
            'sucesso' => false,
            'mensagem' => 'ID do usuário não fornecido.'
        ], 400);
    }

    $despesas = DB::table('despesas')
        ->leftJoin('categoria_saidas', 'despesas.id_Categoria_saida', '=', 'categoria_saidas.id_Categoria_saida')
        ->leftJoin('tipo_pagamentos', 'despesas.id_Tipo_pagamento', '=', 'tipo_pagamentos.id_Tipo_pagamento')
        ->leftJoin('contas', 'despesas.id_conta', '=', 'contas.id_conta')
        ->where('despesas.uid', $uid)
        ->select(
            'despesas.id',
            'despesas.valor',
            'despesas.data',
            'despesas.descricao',
            'despesas.status',
            'categoria_saidas.nome as nome_categoria',
            'tipo_pagamentos.nome as tipo_pagamento',
            'contas.banco_nome as nome_conta'
        )
        ->orderBy('despesas.data', 'desc')
        ->get();

    return response()->json($despesas);
}

}
