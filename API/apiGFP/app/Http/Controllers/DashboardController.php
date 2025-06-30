<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function topGastos(Request $request)
    {
        return DB::table('despesas')
            ->select('id_Categoria_saida', 'valor')
            ->where('uid', $request->uid)
            ->whereBetween('data', [$request->startDate, $request->endDate])
            ->orderByDesc('valor')
            ->limit(5)
            ->get();
    }

    public function topGastosPorCategoria(Request $request)
    {
        return DB::table('despesas')
            ->select('id_Categoria_saida', DB::raw('SUM(valor) as total'))
            ->where('uid', $request->uid)
            ->whereBetween('data', [$request->startDate, $request->endDate])
            ->groupBy('id_Categoria_saida')
            ->orderByDesc('total')
            ->get();
    }

    public function gastosPorTipoPagamento(Request $request)
    {
        return DB::table('despesas')
            ->select('id_Tipo_pagamento', DB::raw('SUM(valor) as total'))
            ->where('uid', $request->uid)
            ->whereBetween('data', [$request->startDate, $request->endDate])
            ->groupBy('id_Tipo_pagamento')
            ->get();
    }

    public function gastosAoLongoDoTempo(Request $request)
    {
        return DB::table('despesas')
            ->select('data', DB::raw('SUM(valor) as total'))
            ->where('uid', $request->uid)
            ->whereBetween('data', [$request->startDate, $request->endDate])
            ->groupBy('data')
            ->orderBy('data')
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
            ->select('id', 'valor', 'data', 'id_Categoria_entrada', DB::raw("'receita' as tipo"))
            ->where('uid', $uid)
            ->whereBetween('data', [$start, $end]);

        $saidas = DB::table('despesas')
            ->select('id', 'valor', 'data', 'id_Categoria_saida', DB::raw("'despesa' as tipo"))
            ->where('uid', $uid)
            ->whereBetween('data', [$start, $end]);

        return $entradas->unionAll($saidas)
            ->orderBy('data')
            ->get();
    }
}
