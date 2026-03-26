"use client";

import { useState } from "react";

interface Props {
  onClose: () => void;
}

interface Message {
  from: "user" | "bot";
  text: string;
}

export default function ChatbotWindow({ onClose }: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hola, soy el asistente de MonteVino. Puedo ayudarte con reservas, horarios, ubicación, menú y mis reservas.",
    },
  ]);

  const getBotResponse = (text: string) => {
    const msg = text.toLowerCase().trim();

    if (
      msg.includes("reservar") ||
      msg.includes("reserva") ||
      msg.includes("mesa")
    ) {
      return "Puedes realizar tu reserva desde la sección 'Reservar', eligiendo fecha, horario y cantidad de personas.";
    }

    if (
      msg.includes("horario") ||
      msg.includes("horarios") ||
      msg.includes("abren") ||
      msg.includes("cierran")
    ) {
      return "Nuestro horario es todos los dias de 18:00 a 00:00.";
    }

    if (
      msg.includes("ubicacion") ||
      msg.includes("ubicación") ||
      msg.includes("direccion") ||
      msg.includes("dirección") ||
      msg.includes("donde") ||
      msg.includes("dónde")
    ) {
      return "Nuestras cedes puedas verlas en la parte inferior donde encontraras un mapa interactivo";
    }

    if (
      msg.includes("menu") ||
      msg.includes("menú") ||
      msg.includes("platos")
    ) {
      return "Puedes consultar nuestro menú completo desde la sección 'Menú'.";
    }

    if (
      msg.includes("mis reservas") ||
      msg.includes("ver reservas") ||
      msg.includes("historial")
    ) {
      return "En la sección 'Mis reservas' podrás consultar tus reservas activas y tu historial.";
    }

    if (
      msg.includes("hola") ||
      msg.includes("buenas") ||
      msg.includes("buenos dias") ||
      msg.includes("buenos días")
    ) {
      return "Hola, bienvenido a MonteVino. ¿Qué deseas consultar?";
    }

    return "Puedo ayudarte con reservas, horarios, ubicación, menú y mis reservas.";
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { from: "user", text };
    const botMessage: Message = { from: "bot", text: getBotResponse(text) };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  const handleSend = () => {
    sendMessage(input);
  };

  const quickOptions = [
    "Reservar mesa",
    "Horarios",
    "Ubicación",
    "Ver menú",
    "Mis reservas",
  ];

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[360px] overflow-hidden rounded-2xl border border-[#d9c4bb] bg-white shadow-2xl">
      <div className="flex items-center justify-between bg-[#7c090c] px-4 py-3 text-white">
        <h3 className="font-semibold">Asistente MonteVino</h3>
        <button onClick={onClose} className="text-lg cursor-pointer">
          ✕
        </button>
      </div>

      <div className="h-[340px] space-y-3 overflow-y-auto bg-[#faf7f5] p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
              msg.from === "user"
                ? "ml-auto bg-[#7c090c] text-white"
                : "border border-[#eaded8] bg-white text-slate-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="border-t border-[#eaded8] bg-white p-3">
        <p className="mb-2 text-sm font-medium text-slate-700">
          Opciones rápidas
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {quickOptions.map((option) => (
            <button
              key={option}
              onClick={() => sendMessage(option)}
              className="cursor-pointer rounded-full border border-[#7c090c] px-3 py-1.5 text-sm text-[#7c090c] transition hover:bg-[#7c090c] hover:text-white"
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Escribe tu consulta..."
            className="flex-1 rounded-lg border border-[#d8c8c0] px-3 py-2 text-sm outline-none"
          />
          <button
            onClick={handleSend}
            className="cursor-pointer rounded-lg bg-[#7c090c] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
