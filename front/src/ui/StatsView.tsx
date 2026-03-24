"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { getReservations } from "@/services/reservationsService";
import { IReserva } from "@/types/types";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/NavBar";
import { useAuth } from "@/context/AuthContext";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Stats() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IReserva[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { checkAdmin, isAuthReady, userData } = useAuth();

  useEffect(() => {
    if (!isAuthReady || !userData) return;
    const init = async () => {
      checkAdmin();
      if (userData.user.role !== "ADMIN") return;
      try {
        const reservas = await getReservations();
        if (Array.isArray(reservas)) {
          setData(reservas);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error(error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [isAuthReady, userData]);

  if (!isAuthReady || !userData) return null;

  // Agrupa por mes y suma totalPrice
  const gananciasPorMes: { [mes: string]: number } = {};
  data.forEach((reserva) => {
    const mes = new Date(reserva.reservationDate).toLocaleString("es-ES", {
      month: "long",
      year: "numeric",
    });
    gananciasPorMes[mes] = (gananciasPorMes[mes] || 0) + reserva.totalPrice;
  });

  // Agrupa por mes y cuenta la cantidad de reservas
  const reservasPorMes: { [mes: string]: number } = {};
  data.forEach((reserva) => {
    const mes = new Date(reserva.reservationDate).toLocaleString("es-ES", {
      month: "long",
      year: "numeric",
    });
    reservasPorMes[mes] = (reservasPorMes[mes] || 0) + 1;
  });

  const labels = Object.keys(gananciasPorMes);
  const valores = Object.values(gananciasPorMes);
  const labelsReservas = Object.keys(reservasPorMes);
  const valoresReservas = Object.values(reservasPorMes);

  const colors = [
    "#3E2723",
    "#8D6E63",
    "#C62828",
    "#AD1457",
    "#283593",
    "#0277BD",
    "#00897B",
    "#F9A825",
    "#F57C00",
    "#6D4C41",
  ];

  const chartGanancias = {
    labels,
    datasets: [
      {
        label: "Dinero generado ($)",
        data: valores,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: colors.slice(0, labels.length).map((c) => c + "CC"),
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: colors
          .slice(0, labels.length)
          .map((c) => c + "99"),
      },
    ],
  };

  const chartReservas = {
    labels: labelsReservas,
    datasets: [
      {
        label: "Cantidad de reservas",
        data: valoresReservas,
        backgroundColor: colors.slice(0, labelsReservas.length),
        borderColor: colors
          .slice(0, labelsReservas.length)
          .map((c) => c + "CC"),
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: colors
          .slice(0, labelsReservas.length)
          .map((c) => c + "99"),
      },
    ],
  };

  const optionsGanancias = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Ganancias Mensuales ($)",
        font: { size: 18 },
      },
    },
  };

  const optionsReservas = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Reservas Mensuales",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1, // Solo números enteros en el eje Y
        },
      },
    },
  };

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="h-full mt-20 w-full bg-[#F6E3D9] flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-col items-center justify-center flex-1 mx-10 mb-10">
          <h2 className="pt-10 mb-10 text-5xl text-center text-red-950">
            Gráficos y Estadísticas
          </h2>

          {loading ? (
            <p className="text-xl text-center text-gray-500">
              Cargando datos...
            </p>
          ) : (
            <div className="flex flex-col gap-6 ml-21">
              {/* Gráfico de ganancias */}
              <div className="p-6 w-300 h-150 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.20)] bg-white">
                <Bar data={chartGanancias} options={optionsGanancias} />
              </div>

              {/* Gráfico de reservas */}
              <div className="p-6 w-300 h-150 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.20)] bg-white">
                <Bar data={chartReservas} options={optionsReservas} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
