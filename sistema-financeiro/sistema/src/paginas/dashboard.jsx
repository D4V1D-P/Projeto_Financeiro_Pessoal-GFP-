import React, { useEffect, useState } from "react";
import { auth } from "../firebase"
import { getUsuarioLogado } from "../utils/user";
import axios from "axios";
import Pesquisa from "../components/pesquisa";
import { Bar, Pie, Line } from "react-chartjs-2";
import { format, subDays } from "date-fns";
import "chartjs-plugin-datalabels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartColumn,
  faChartLine,
  faChartPie,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);


const Dashboard = () => {
  const currentUser = auth.currentUser

  const [topGastos, setTopgastos] = useState([]);
  const [topCategorias, setTopcategorias] = useState([]);
  const [tipoPag, setTipopag] = useState([]);
  const [gastostempo, setGastostempo] = useState([]);
  const [saldototal, setSaldototal] = useState([]);
  const [saidastotais, setSaidastotais] = useState([]);
  const [entradas, setEntradas] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [uid, setUid] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUsuarioLogado();
      if (user) {
        setUid(currentUser.uid);
        //fetchInitialData(user.uid)

        const end = new Date();
        const start = subDays(end, 30);

        const formattedStart = format(start, "yyyy-MM-dd");
        const formattedEnd = format(end, "yyyy-MM-dd");

        setStartDate(formattedStart);
        setEndDate(formattedEnd);

        fetchData(uid, formattedStart, formattedEnd);
      } else {
        alert("Usuário não encontrado ou não logado");
      }
    };

    fetchUser();
  }, []);

  const fetchData = async () => {
    try {
      const params = { startDate, endDate, uid };
      console.log(params);
      const [
        gastosResponse,
        categoriasResponse,
        tipoPagResponse,
        gastostempoResponse,
        saldoResponse,
        saidasResponse,
        entradasResponse,
      ] = await Promise.all([
        axios.get("http://localhost:8000/api/topgastos", { params }),
        axios.get("http://localhost:8000/api/topgastosporcategoria", {
          params,
        }),
        axios.get("http://localhost:8000/api/gastosportipopagamento", {
          params,
        }),
        axios.get("http://localhost:8000/api/gastosaolongodotempo", { params }),
        axios.get("http://localhost:8000/api/saldototal", { params }),
        axios.get("http://localhost:8000/api/saidastotais", { params }),
        axios.get("http://localhost:8000/api/gastosedespesas", { params }),
      ]);

      setTopgastos(gastosResponse.data);
      setTopcategorias(categoriasResponse.data);
      setTipopag(tipoPagResponse.data);
      setGastostempo(gastostempoResponse.data);
      setSaldototal(saldoResponse.data);
      setSaidastotais(saidasResponse.data);
      setEntradas(entradasResponse.data);

      console.log(entradasResponse.data);
    } catch (error) {
      alert("Erro ao buscar dados filtrados" + error);
      console.error(error);
    }
  };

  const topProdutosGastos = {
    labels: topGastos.map((item) => item.nome_categoria || "Desconhecida"),
    datasets: [
      {
        label: "Categoria",
        data: topGastos.map((item) => item.valor),
        backgroundColor: [
          "rgba(0, 51, 102, 1)",
          "rgba(18, 72, 106)",
          "rgba(54, 114, 114)",
          "rgba(72, 135, 118)",
          "rgba(126, 198, 130)",
          "rgba(144, 219, 134)",
          "rgb(158, 221, 174)",
        ],
        borderColor: [
          "rgba(0, 51, 102, 1)",
          "rgba(18, 72, 106)",
          "rgba(54, 114, 114)",
          "rgba(72, 135, 118)",
          "rgba(126, 198, 130)",
          "rgba(144, 219, 134)",
          "rgba(43, 253, 95)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const topGastosCategoria = {
    labels: topCategorias.map((item2) => item2.nome_categoria || "Desconhecida"),
    datasets: [
      {
        label: "Gastos por Categoria",
        data: topCategorias.map((item2) => item2.total),
        backgroundColor: [
          "rgba(0, 51, 102)",
          "rgba(18, 72, 106)",
          "rgba(72, 135, 118)",
          "rgba(126, 198, 130)",
          "rgba(144, 219, 134)",
          "rgba(160, 245, 149)",
        ],
        borderColor: [
          "rgba(0, 51, 102)",
          "rgba(18, 72, 106)",
          "rgba(72, 135, 118)",
          "rgba(126, 198, 130)",
          "rgba(144, 219, 134)",
          "rgba(144, 219, 134)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const topGastosPag = {
    labels: tipoPag.map((item3) => item3.tipo_pagamento || "Não informado"),
    datasets: [
      {
        label: "Gastos por Tipo de Pagamento",
        data: tipoPag.map((item3) => item3.total),
        backgroundColor: [
          "rgba(0, 51, 102, 0.500)",
          "rgba(0, 51, 102, 0.995)",
          "rgba(0, 51, 102, 0.849)",
          "rgba(0, 51, 102, 0.705)",
          "rgba(0, 51, 102, 0.534)",
        ],
        borderColor: "#fff",
        borderWidth: 3,
      },
    ],
  };


  const Gastosaolongodotempo = {
    labels: gastostempo.map((item4) =>
      format(new Date(item4.data), "dd/MM/yyyy")
    ),
    datasets: [
      {
        label: "Gastos ao Longo do Tempo",
        data: gastostempo.map((item4) => item4.total),
        backgroundColor: "rgba(144, 219, 134)",
        borderColor: "#003366",
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="campo">
      <Pesquisa />
      <div className="dados pt-4 w-100">
        <div className="row mb-4 w-60">
          <div className="col-xl-6 align-items-center d-flex">
            <h2>Dashboard</h2>
          </div>
          <div className="col-xl-6 filtroDashboard">
            <div>
              <label>Data Início</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="form-control"
              />
            </div>
            <div>
              <label>Data Fim</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="form-control"
              />
            </div>
            <button
              onClick={fetchData}
              className="btn mt-4"
              style={{ backgroundColor: "#003366", color: "#fff" }}
            >
              Filtrar
            </button>
          </div>
          <div className="col-md-4">
            <div
              className="border  mt-4 p-3 d-flex align-items-center"
              style={{ width: "96%" }}
            >
              <FontAwesomeIcon
                icon={faCircleDollarToSlot}
                style={{
                  color: "#003366",
                  height: "35px",
                  marginRight: "20px",
                  marginLeft: "20px",
                }}
              />
              <div>
                <h6 style={{ color: "#003366", margin: 0 }}>Saldo total</h6>
                {saldototal.length > 0 && saidastotais.length > 0 ? (
                  <p style={{ fontSize: "15pt", margin: 0 }}>
                    R$ {saldototal[0].total - saidastotais[0].total}
                  </p>
                ) : (
                  <p style={{ margin: 0 }}>Não há dados suficientes.</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="border  mt-4 p-3 d-flex align-items-center"
              style={{ width: "96%" }}
            >
              <FontAwesomeIcon
                icon={faCircleDollarToSlot}
                style={{
                  color: "#003366",
                  height: "35px",
                  marginRight: "20px",
                  marginLeft: "20px",
                }}
              />
              <div>
                <h6 style={{ color: "#003366", margin: 0 }}>
                  Total de Receitas
                </h6>
                {saldototal.length > 0 && saidastotais.length > 0 ? (
                  <p style={{ fontSize: "15pt", margin: 0 }}>
                    ${saldototal[0].total}
                  </p>
                ) : (
                  <p style={{ margin: 0 }}>Não há dados suficientes.</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="border  mt-4 p-3 d-flex align-items-center"
              style={{ width: "96%" }}
            >
              <FontAwesomeIcon
                icon={faCircleDollarToSlot}
                style={{
                  color: "#003366",
                  height: "35px",
                  marginRight: "20px",
                  marginLeft: "20px",
                }}
              />
              <div>
                <h6 style={{ color: "#003366", margin: 0 }}>
                  Total de Despesas
                </h6>
                {saldototal.length > 0 && saidastotais.length > 0 ? (
                  <p style={{ fontSize: "15pt", margin: 0 }}>
                    ${saidastotais[0].total}
                  </p>
                ) : (
                  <p style={{ margin: 0 }}>Não há dados suficientes.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dados mb-3 pt-2">
        <div className="container">
          <div className="row">
            <div className="col-md-7 mb-3">
              <div className="row">
                <div className="col-12">
                  <div className="border2 p-4">
                    <div className="d-flex">
                      <h5 style={{ marginRight: "8px" }}>
                        Total de gastos por data
                      </h5>
                      <FontAwesomeIcon icon={faChartLine} color="#003366" />
                    </div>
                    <div style={{ height: "280px", width: "100%" }}>
                      <Line
                        data={Gastosaolongodotempo}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                
                <div className="col-6 mt-3">
                  <div className="border2 p-4">
                    <div className="d-flex">
                      <h5 style={{ marginRight: "8px" }}>
                        Gastos por Tipo de Pagamento
                      </h5>
                      <FontAwesomeIcon icon={faChartPie} color="#003366" />
                    </div>
                    <div style={{ height: "280px", width: "100%" }}>
                      <Pie
                        data={topGastosPag}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6  mt-3 mb-3">
                  <div className="border2 p-3">
                    <div className="d-flex">
                      <h5 style={{ marginRight: "8px" }}>Gastos por Categoria</h5>
                      <FontAwesomeIcon icon={faChartColumn} color="#003366" />
                    </div>
                    <div style={{ height: "280px", width: "100%" }}>
                      <Bar
                        data={topGastosCategoria}
                        options={{ responsive: true, maintainAspectRatio: false }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="border2 p-3">
                    <div className="d-flex">
                      <h5 style={{ marginRight: "8px" }}>
                        Top 5 maiores gastos
                      </h5>
                      <FontAwesomeIcon icon={faChartBar} color="#003366" />
                    </div>
                    <div style={{ height: "280px", width: "100%" }}>
                      <Bar
                        data={topProdutosGastos}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          indexAxis: "y",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <div className="mb-3 border2 p-4">
                {entradas.map((e) => (
                  <div key={e.id}>
                    <div className="row py-1">
                      <div className="col-2 d-flex justify-content-center align-items-center">
                        <span>{e.id}</span>
                      </div>
                      <div className="col-6 flex-column d-flex justify-content-center">
                        <span>{e.nome_categoria}</span>
                        <p className="text-secondary p-0 m-0">
                          {new Date(e.data).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="col-4 d-flex justify-content-center align-items-center">
                        {e.tipo === "despesa" ? (
                          <span className="text-danger">- R${e.valor}</span>
                        ) : (
                          <span className="text-success">+ R${e.valor}</span>
                        )}
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="col-xl-6 mb-3">
              <div className="border2 p-3">
                <div className="d-flex">
                  <h5 style={{ marginRight: "8px" }}>Top 5 maiores gastos</h5>
                  <FontAwesomeIcon icon={faChartBar} color="#003366" />
                </div>
                <div style={{ height: "280px", width: "100%" }}>
                  <Bar
                    data={topProdutosGastos}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      indexAxis: "y",
                    }}
                  />
                </div>
              </div>
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
