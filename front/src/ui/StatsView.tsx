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
      checkAdmin(); // Espera a que checkAdmin termine
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

  const labels = Object.keys(gananciasPorMes);
  const valores = Object.values(gananciasPorMes);

  const colors = [
    "#3E2723", // Marrón oscuro
    "#8D6E63", // Marrón claro
    "#C62828", // Rojo intenso
    "#AD1457", // Fucsia oscuro
    "#283593", // Azul oscuro
    "#0277BD", // Azul medio
    "#00897B", // Verde azulado
    "#F9A825", // Amarillo mostaza
    "#F57C00", // Naranja
    "#6D4C41", // Marrón chocolate
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Dinero generado",
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

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Ganancias Mensuales",
        font: { size: 18 },
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
          <div className="flex justify-center gap-5">
            <Bar
              data={chartData}
              options={options}
              className="w-150 h-full p-6 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.20)] bg-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
