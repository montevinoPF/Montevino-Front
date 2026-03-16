import { IReservation } from "@/types/types";

export const preloadReservation: IReservation[] = [
  {
    hora: "20:00",
    cliente: "Juan Pérez",
    personas: 4,
    mesa: 1,
    estado: "confirmada",
  },
  {
    hora: "21:00",
    cliente: "Kyara",
    personas: 5,
    mesa: 3,
    estado: "confirmada",
  },
  {
    hora: "22:00",
    cliente: "Martín Gómez",
    personas: 5,
    mesa: 7,
    estado: "pendiente",
  },
  {
    hora: "22:30",
    cliente: "Ana Martinez",
    personas: 10,
    mesa: 4,
    estado: "confirmada",
  },
];
