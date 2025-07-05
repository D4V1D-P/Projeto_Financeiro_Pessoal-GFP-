<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function topGastos(Request $request)
{
    return DB::table('despesas')
        ->leftJoin('categoria_saidas', 'despesas.id_Categoria_saida', '=', 'categoria_saidas.id_Categoria_saida')
        ->select(
            'despesas.id',
            'categoria_saidas.nome as nome_categoria',
            'despesas.valor'
        )
        ->where('despesas.uid', $request->uid)
        ->whereBetween('despesas.data', [$request->startDate, $request->endDate])
        ->orderByDesc('despesas.valor')
        ->limit(5)
        ->get();
}


    public function topGastosPorCategoria(Request $request)
{
    return DB::table('despesas')
        ->leftJoin('categoria_saidas', 'despesas.id_Categoria_saida', '=', 'categoria_saidas.id_Categoria_saida')
        ->select(
            'categoria_saidas.nome as nome_categoria',
            DB::raw('SUM(despesas.valor) as total')
        )
        ->where('despesas.uid', $request->uid)
        ->whereBetween('despesas.data', [$request->startDate, $request->endDate])
        ->groupBy('categoria_saidas.nome')
        ->orderByDesc('total')
        ->get();
}


    public function gastosPorTipoPagamento(Request $request)
{
    return DB::table('despesas')
        ->leftJoin('tipo_pagamentos', 'despesas.id_Tipo_pagamento', '=', 'tipo_pagamentos.id_Tipo_pagamento')
        ->select(
            'tipo_pagamentos.nome as tipo_pagamento',
            DB::raw('SUM(despesas.valor) as total')
        )
        ->where('despesas.uid', $request->uid)
        ->whereBetween('despesas.data', [$request->startDate, $request->endDate])
        ->groupBy('tipo_pagamentos.nome')
        ->get();
}


    public function gastosAoLongoDoTempo(Request $request)
{
    return DB::table('despesas')
        ->select('despesas.data', DB::raw('SUM(despesas.valor) as total'))
        ->where('despesas.uid', $request->uid)
        ->whereBetween('despesas.data', [$request->startDate, $request->endDate])
        ->groupBy('despesas.data')
        ->orderBy('despesas.data')
        ->get();
}


    public function saldoTotal(Request $request)
    {
        return DB::table('receitas')
            ->select(DB::raw('SUM(valor) as total'))
            ->where('uid', $request->uid)
            ->get();
    }

    public function saidasTotais(Request $request)
    {
        return DB::table('despesas')
            ->select(DB::raw('SUM(valor) as total'))
            ->where('uid', $request->uid)
            ->get();
    }

public function gastosEDespesas(Request $request)
{
    $start = $request->startDate;
    $end = $request->endDate;
    $uid = $request->uid;

    $entradas = DB::table('receitas')
        ->leftJoin('categoria_entradas', 'receitas.id_Categoria_entrada', '=', 'categoria_entradas.id_Categoria_entrada')
        ->select(
            'receitas.id',
            'receitas.valor',
            'receitas.data',
            'categoria_entradas.nome as nome_categoria',
            DB::raw("'receita' as tipo")
        )
        ->where('receitas.uid', $uid)
        ->whereBetween('receitas.data', [$start, $end]);

    $saidas = DB::table('despesas')
        ->leftJoin('categoria_saidas', 'despesas.id_Categoria_saida', '=', 'categoria_saidas.id_Categoria_saida')
        ->select(
            'despesas.id',
            'despesas.valor',
            'despesas.data',
            'categoria_saidas.nome as nome_categoria',
            DB::raw("'despesa' as tipo")
        )
        ->where('despesas.uid', $uid)
        ->whereBetween('despesas.data', [$start, $end]);

    $dados = $entradas->unionAll($saidas);

    return DB::table(DB::raw("({$dados->toSql()}) as sub"))
        ->mergeBindings($dados) // essencial para funcionar corretamente com parâmetros
        ->orderBy('data')
        ->get();
}

}
